import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Pueblo Mágico',
        short_name: 'Pueblo Mágico',
        description: 'Ecocentro en Sierras Grandes de Córdoba: retiros, glamping, campamentos educativos y voluntariados en la montaña.',
        theme_color: '#FDFBF7',
        background_color: '#FDFBF7',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/uploads/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/uploads/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
        globPatterns: ['**/*.{js,css,ico,png,svg}'],
        globIgnores: ['**/uploads/**'],
        navigateFallback: null,
        runtimeCaching: [
          {
            // Guardar imágenes de Unsplash para verlas offline
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Guardar fuentes de Google
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url))
    },
    dedupe: ['react', 'react-dom']
  },
  server: {
    host: true,
    // choose a constant port so the URL doesn't shift each time you restart
    // and so you can bookmark or open it without guessing.
    port: 5173
  }
})