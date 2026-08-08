// Hashing de contraseñas para usuarios_admin (Panel de Reservas) — PBKDF2-
// HMAC-SHA256 vía Web Crypto, nativo en el runtime de Cloudflare Workers, sin
// dependencias externas. El script scripts/crear-usuario-admin.mjs genera el
// mismo formato de hash usando crypto.pbkdf2Sync de Node (mismos parámetros),
// para poder crear el primer usuario antes de que exista ningún login.
//
// Formato guardado: "pbkdf2$<iteraciones>$<saltHex>$<hashHex>".

const ITERATIONS = 100_000;
const SALT_BYTES = 16;
const KEY_LENGTH_BITS = 256;

function toHex(bytes: Uint8Array): string {
  return [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

async function deriveHash(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: salt as BufferSource, iterations, hash: 'SHA-256' }, keyMaterial, KEY_LENGTH_BITS);
  return toHex(new Uint8Array(bits));
}

// Comparación en tiempo constante — evita que el tiempo de respuesta filtre
// en qué posición difiere el hash.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await deriveHash(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toHex(salt)}$${hash}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const partes = stored.split('$');
  if (partes.length !== 4 || partes[0] !== 'pbkdf2') return false;
  const iterations = Number(partes[1]);
  if (!Number.isInteger(iterations) || iterations < 1) return false;
  const salt = fromHex(partes[2]);
  const hashEsperado = partes[3];
  const hashReal = await deriveHash(password, salt, iterations);
  return timingSafeEqual(hashReal, hashEsperado);
}
