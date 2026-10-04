# Rama `developer` — cambios respecto de `main`

Traspaso para continuar el desarrollo. Cubre los 3 commits que `developer` tiene por encima de `main` (`5c76929`):

| Commit | Fecha | Resumen |
|---|---|---|
| `a1e6826` | 2026-09-24 | Precios de estadía en D1 como única fuente de verdad + endpoint del agente de Instagram |
| `2e52ee5` | 2026-09-24 | Calendario del widget con ventana móvil de 6 meses |
| `1f6bdcd` | 2026-09-25 | Precios de las páginas estáticas leídos de D1 en cada build |

## La idea en una línea

**Ningún monto de estadía vive en el código.** Camping, Eco-Refugio, Domo, comidas y Reset Vital presencial se guardan en D1 (tablas `tarifas`, `extras`, `feriados`) y todo lo que muestra o cotiza un precio los lee de ahí con la misma función (`src/lib/tarifas.ts`).

```
                 D1: tarifas / extras / feriados
                               │
        functions/_lib/cotizador.ts → leerPrecios(db)
           │                    │                    │
  /api/disponibilidad      /api/cotizar         /api/manychat
   (devuelve precios)     (agente n8n)        (flow ManyChat + MP)
      │          │
  BookingWidget  scripts/fetch-precios.mjs  (prebuild)
  (en vivo)           │
                 src/data/precios-build.json  (commiteado)
                      │
          src/data/precios.ts + scripts/prerender.mjs
          (textos "Desde $X" y meta descriptions)
```

- Cambio de precio en D1 → llega **al instante** al widget, a `/api/cotizar` y a ManyChat.
- A los textos estáticos ("Desde $X", meta description de `/estadia`) llega **en el próximo build/deploy**.

---

## 1. Base de datos (D1)

**Archivo nuevo:** `add_tarifas.sql` (aditivo, `CREATE TABLE IF NOT EXISTS` + `INSERT OR IGNORE`; no toca reservas ni alojamientos). Las mismas tablas se agregaron al final de `schema.sql` para instalaciones desde cero.

```bash
npx wrangler d1 execute magico-ensueno-db --file=./add_tarifas.sql            # local
npx wrangler d1 execute magico-ensueno-db --file=./add_tarifas.sql --remote   # producción
```

### `tarifas` — por tipo, no por alojamiento
Todos los montos son **por persona por noche**.

| Columna | Significado |
|---|---|
| `tipo` | `'domo' \| 'refugio' \| 'camping'` (PK) |
| `precio_noche` | alojamiento + desayuno |
| `precio_pension_completa` | total con desayuno + almuerzo + cena |
| `precio_noche_finde`, `precio_pension_completa_finde` | noches cuya mañana siguiente es sábado, domingo o feriado. `NULL` = igual que en semana |
| `minimo_personas_facturadas` | el alojamiento se cobra como mínimo por esta cantidad (Domo = 2). Las comidas se cobran por las personas reales |

Valores iniciales (Propuesta Comercial 2026/27, tarifas base lun–vie):

| Tipo | Noche + desayuno | Pensión completa | Mín. facturado |
|---|---|---|---|
| camping | $20.000 | $45.000 | 1 |
| refugio | $35.000 | $60.000 | 1 |
| domo | $50.000 | $75.000 | 2 |

Las tarifas de fin de semana todavía no están definidas → quedan en `NULL`.

Por qué por tipo: Domo 1 y Domo 2 comparten precio, y Camping no es una unidad física de `alojamientos` (no tiene capacidad ni aparece en la grilla del Panel de Reservas).

### `extras`
Por persona **por noche**. Los `codigo` los usa el cotizador: no renombrarlos sin tocar `src/lib/tarifas.ts`.

| codigo | precio |
|---|---|
| `almuerzo` | $20.000 |
| `cena` | $20.000 |
| `reset_presencial` | $5.000 |

### `feriados`
`fecha` (`YYYY-MM-DD`) + `descripcion`. La noche anterior a un feriado se cobra con tarifa de finde. Vacía por ahora.

### Cambiar un precio
```sql
UPDATE tarifas SET precio_noche = 55000, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE tipo = 'domo';
```
Después, hacer un deploy para que se actualicen los textos estáticos.

---

## 2. Lógica de cálculo — `src/lib/tarifas.ts` (nuevo)

Compartido entre el frontend y las Pages Functions (se importa desde `functions/` con ruta relativa).

- `calcularCotizacion(precios, tipo, personas, entrada, salida, comidas = 'desayuno', resetPresencial = false)` → `Cotizacion | { error }`
  - Itera noche por noche; cada una se marca `finde` con `esNocheDeFinde()`.
  - Alojamiento = precio de la noche × `max(personas, minimo_personas_facturadas)`.
  - `comidas`: `'desayuno'` (incluido), `'almuerzo'` o `'cena'` (extra), `'pension_completa'` (= `precio_pension_completa − precio_noche`, por persona real).
  - Reset Vital presencial = `extras.reset_presencial` × personas × noches.
  - Devuelve `detalle_noches`, `alojamiento`, `comidas_total`, `reset_total`, `subtotal`.
- `calcularSena(subtotal)` → 50% si el total ≤ $100.000, 30% si es mayor. Es regla comercial, por eso queda en código.
- Tipos exportados: `TipoAlojamiento`, `Comidas`, `Tarifa`, `Precios`, `Cotizacion`; constantes `TIPOS_ALOJAMIENTO`, `OPCIONES_COMIDAS`.

`functions/_lib/cotizador.ts`:
- **Nuevo** `leerPrecios(db)`: lee las 3 tablas y arma el objeto `Precios`.
- **Eliminados** `calcularPrecio()` y `nochesEntre()` (tenían los montos hardcodeados, incluido el domo 1 persona a $150.000).
- `chequearDisponibilidad()`: camping siempre `disponible` con `alojamiento_id: null`; para domo ahora exige `capacidad_total >= personas`.

---

## 3. Endpoints

### `POST /api/cotizar` (tool "Disponibilidad" del agente de n8n)
Body:
```
fecha_entrada, fecha_salida   'YYYY-MM-DD' o 'DD/MM/AAAA'
cantidad_personas             entero ≥ 1
tipo_alojamiento              'domo' | 'refugio' | 'camping'
comidas?                      'desayuno' (default) | 'almuerzo' | 'cena' | 'pension_completa'
reset_presencial?             boolean (default false)
```
- Nuevo: `camping`, `comidas`, `reset_presencial` y fechas `DD/MM/AAAA`.
- Valida capacidad máxima por unidad contra `alojamientos.capacidad_total` (error explícito en vez de un "ocupado" engañoso).
- **La forma de `desglose` cambió**: ahora es el objeto `Cotizacion` de `tarifas.ts` (antes tenía `precio_por_noche` y `exclusividad_gratis`). Si el prompt del agente lee esos campos, hay que actualizarlo.

### `GET /api/disponibilidad`
Además de lo que ya devolvía, agrega `precios` (salida de `leerPrecios`). Lo usan el widget y el script de prebuild.

### `POST /api/manychat`
Usa `leerPrecios` + `calcularCotizacion` + `calcularSena`. Sigue cotizando **solo alojamiento + desayuno** y solo acepta `domo`/`refugio`.

### `POST /api/agente/consulta` (nuevo)
Reemplaza la tool "Agregar interesados" del agente de n8n, que hacía append/update en la hoja "Consultas" de Google Sheets. Guarda en la tabla `consultas` de D1 (la que muestra la pestaña Consultas del Panel de Reservas).

- Header obligatorio: `X-Agente-Secret: <AGENTE_API_KEY>` (si no coincide → 401).
- Body: `{ subscriber_id, nombre, apellido?, telefono?, alojamiento?, desde?, hasta?, personas?, monto_total? }`. Fechas `DD/MM/AAAA` o `YYYY-MM-DD`.
- Upsert por `subscriber_id`: si existe, actualiza; los campos vacíos no pisan lo guardado. Si no hay nombre, guarda `Instagram #<subscriber_id>`.
- `fecha_consulta` en hora Argentina sin `Z` (mismo formato que las consultas importadas del Sheet).
- **Variable nueva:** `AGENTE_API_KEY` (documentada en `.env.example`).

---

## 4. Frontend

### `components/BookingWidget.tsx`
- Precios vía `/api/disponibilidad` y cálculo con `calcularCotizacion`. **Sin fallback con montos**: si la API falla se muestra "Te pasamos el precio exacto por WhatsApp" (`priceUnavailable`).
- Se reemplazó el selector Compartida/Privada por:
  - selector de **comidas** (las 4 opciones de `OPCIONES_COMIDAS`),
  - checkbox **Reset Vital presencial**,
  - aviso de mínimo facturado del domo (`minimumBilledNote`).
- Desglose del total: alojamiento / comidas / Reset Vital + seña.
- **Eliminada la Promo Parejas** y toda la lógica de privacidad/recargos.
- **Calendario con ventana móvil**: mes actual + 5 siguientes (`MESES_VISIBLES = 6`), nombres desde `monthNames`/`monthAbbr` de `data.json`. Antes tenía julio–septiembre 2026 fijos.
- Mensaje de WhatsApp por defecto → "temporada 2026/27"; `groupTeaser` ya no promete tarifas de grupo.

### `src/data/precios.ts` (nuevo) — para textos estáticos
Lee `src/data/precios-build.json`. Helpers: `precioDesde(tipo)`, `pensionCompletaDesde(tipo)`, `minimoPersonas(tipo)`, `precioExtra(codigo)`, `precioEntrada()` (el alojamiento más barato) y `ars(monto, lang)` para formatear.
Para cotizar una estadía concreta **no** usar esto: usar `src/lib/tarifas.ts`.

### Páginas y componentes sin montos hardcodeados
- `src/Estadia.tsx`: tarjetas, tabla de precios, textos de comidas/pensión/Reset Vital y meta description.
- `components/HeroNuevo.tsx`, `components/SectionExperiencias.tsx`, `components/SectionInclusiones.tsx`.
- **Eliminado** `ESTADIA_PRICES` de `src/data/retreats.ts`.

### `data.json` (es + en)
- Placeholders nuevos: `{desde}` en `hero.reservationPricing` y `experiences.card_extra_text`; `{min}` en `price_pension_sub` y `minimumBilledNote`. Se reemplazan en el componente con `.replace(...)` / `fillTemplate`.
- Agregadas en `booking`: `monthNames`, `mealsLabel`, `meals.{desayuno,almuerzo,cena,pension_completa}`, `resetLabel`, `breakdownLodging`, `breakdownMeals`, `breakdownReset`, `minimumBilledNote`, `priceUnavailable`.
- Eliminadas: `months`, `carpaRegimen`, `roomType`, `sharedRoom`, `privateRoom`, `privateDomoNote`, `perPersonPerNight`, `discountApplied`, `privacySurcharge`, `privacyIncluded`.

---

## 5. Build

- `package.json`: nuevo script **`prebuild`** → `node scripts/fetch-precios.mjs`.
- `scripts/fetch-precios.mjs` (nuevo): llama a `https://experienciamagico.com/api/disponibilidad`, valida que estén los 3 tipos y los 3 extras, y escribe `src/data/precios-build.json`.
  - Si la API falla (sin red, o producción todavía sin la tabla `tarifas`), **usa el `precios-build.json` commiteado** y el build sigue. Solo falla si no existe ningún archivo previo.
  - Contra otro entorno: `PRECIOS_API_URL=http://localhost:8788 node scripts/fetch-precios.mjs`.
  - **Commitear `precios-build.json`** cuando cambie: es el respaldo del build.
- `scripts/prerender.mjs`: la meta description de `/estadia` se arma desde `precios-build.json` (antes decía "Desde $40.000 … 20% dto. lun–jue", ya inválido).

---

## 6. Decisiones de negocio reflejadas en el código

- **Domo: siempre privado para el grupo**, hasta 7 personas, se factura como mínimo por 2. Desaparece "domo compartido" y "exclusivo desde 4 personas".
- **Promo Parejas eliminada.**
- **Reset Vital presencial se cobra por persona por día** (antes los textos decían "tarifa única por persona").
- Tarifa de finde = tarifa de semana hasta que se carguen valores `*_finde`.

---

## 7. Checklist para desplegar / verificar

No hay registro en esta rama de que estos pasos ya se hayan hecho en producción. Confirmar cada uno:

- [ ] **Pushear la rama**: `developer` no tiene upstream configurado (`git push -u origin developer`).
- [ ] Aplicar `add_tarifas.sql` en D1 **remoto**. Sin las tablas, `/api/disponibilidad`, `/api/cotizar` y `/api/manychat` fallan en `leerPrecios`.
- [ ] Cargar `AGENTE_API_KEY` en Cloudflare Pages (producción y preview).
- [ ] En n8n: cambiar la tool "Agregar interesados" de Google Sheets a `POST /api/agente/consulta` con el header `X-Agente-Secret`.
- [ ] En n8n: revisar que la tool "Disponibilidad" (`/api/cotizar`) no lea `desglose.precio_por_noche` ni `desglose.exclusividad_gratis` (ya no existen), y que pueda mandar `comidas` / `reset_presencial` / `camping`.
- [ ] Después de aplicar el SQL remoto, correr `npm run build` y confirmar que el log diga `fetch-precios: precios de https://experienciamagico.com …` (y no el aviso ⚠️ de respaldo).
- [ ] `npx tsc --noEmit` sin errores.

## 8. Pendientes conocidos

- **Precios viejos hardcodeados fuera de esta rama**: `src/WinterCamp.tsx` (líneas ~1277 y ~1432) y `src/WinterRedirection.tsx` (~1196 y ~1335) siguen diciendo "$50.000 … domo privado $150.000". Pasarlos a `src/data/precios.ts` o retirar esas páginas si la temporada de invierno terminó.
- `PROMO_PAREJAS_RESERVA_HASTA` en `src/data/availability.ts` quedó sin uso; se puede borrar.
- `/api/manychat` no acepta `camping`, y aunque lo aceptara, `chequearDisponibilidad` devuelve `alojamiento_id: null` para camping y el endpoint lo trataría como ocupado. Camping se coordina por WhatsApp.
- Camping no tiene cupo en D1: el widget y el agente siempre lo informan disponible.
- Tarifas de fin de semana y feriados: pendientes de definición comercial; cuando estén, son solo `UPDATE`/`INSERT` en D1 + deploy.
- No hay panel admin para editar `tarifas`/`extras`/`feriados`; hoy se editan con `wrangler d1 execute`.
