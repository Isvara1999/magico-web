/// <reference types="vite/client" />

export function img(path: string, width: number, quality = 80): string {
  if (import.meta.env.DEV) return path;
  return `/.netlify/images?url=${encodeURIComponent(path)}&w=${width}&fm=webp&q=${quality}`;
}
