// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png'
      ],
      manifest: {
        name: 'Hindi Learning App',
        short_name: 'HindiApp',
        description: 'A language learning app ',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      // ← add this block:
      workbox: {
        // bump default 2 MiB up to 5 MiB so your ~3.1 MB bundle is precached
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }
    })
  ],

  build: {
    // optional: split big libs into their own chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'lottie-player': [
            '@lottiefiles/react-lottie-player',
            'lottie-web'
          ],
          // add other manual chunks here if needed
        }
      }
    },
    // optional: raise Vite’s own chunk‑size warning limit
    chunkSizeWarningLimit: 3000, // KB
  }
})
