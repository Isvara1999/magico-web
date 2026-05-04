# Mágico Ensueño — magico-ensueno

## Commands
```
npm run dev        # Vite dev server
npm run build      # Vite build + postbuild (prerender script)
npm run preview    # Preview build
npx tsc --noEmit   # Única verificación disponible (sin linter, sin tests)
```

## Architecture
- Pages: `src/*.tsx`
- Section components: `src/components/[Page][Section].tsx`
- Shared layout: `components/` — root level, NOT inside src/
- Routing: `src/routes.ts` + `src/App.tsx` → también actualizar prerender script al agregar páginas

## Content — REGLA CRÍTICA
- Todo el texto vive en `data.json` (raíz). Nunca hardcodear strings en componentes.
- `useLanguage()` devuelve el bundle completo como `t`. Si `t.section.key` no existe → TypeError en render → pantalla en blanco (ErrorBoundary la captura silenciosamente).
- Cada nueva key debe agregarse a **ambas** secciones: `es` y `en`.
- Cuidado editando `data.json` a mano: un salto de línea literal dentro de un string rompe todo el bundle (cascada de 129+ errores TypeScript).
- Scripts de fix temporales → escribir como `fix-cosa.mjs` en raíz, ejecutar con `node fix-cosa.mjs`, borrar.

## Imports
Usar siempre rutas relativas. El alias `@/*` está definido en tsconfig y vite.config pero nunca se usa en el codebase. No empezar a usarlo.

## Animations (scroll reveal)
- Agregar `data-reveal` (y opcionalmente `data-delay="1"` a `"4"`) a los elementos.
- `data-reveal` debe estar en un div wrapper **sin `className`**. React sobreescribe `className` en cada render y borra la clase `visible` que agrega IntersectionObserver.

## Design tokens
| Token | Valor | Uso |
|---|---|---|
| `brand-green` | #005333 | `bg-brand-green`, `text-brand` |
| `gold` | #D4AF37 | `bg-brand-gold`, `text-gold`, `bg-gold` |
| Utilities | — | `btn-gold`, `btn-glass`, `serif-title` |

## Config / WhatsApp
- WA numbers + SITE_URL: `src/data/config.ts`
- Fechas, precios, mensajes por retiro: `src/data/retreats.ts`

## Debugging
- Pantalla en blanco → revisar ErrorBoundary + keys faltantes en `data.json` (es + en).
- Componente que no aparece → verificar que está importado en la página correcta.
