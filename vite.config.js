// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/finalyearcse/',   // 🔴 REQUIRED for GitHub Pages

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
        description: 'A language learning app',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/finalyearcse/',   // 🔴 FIXED
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
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }
    })
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lottie-player': [
            '@lottiefiles/react-lottie-player',
            'lottie-web'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 3000,
  }
})
