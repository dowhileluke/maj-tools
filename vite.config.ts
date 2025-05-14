import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // devOptions: { enabled: true },
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'qr.png', 'kofi.png'],
      manifest: {
        name: 'MajTools',
        short_name: 'MajTools',
        description: 'Mahjong Tools',
        theme_color: '#262626',
        background_color: '#262626',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ],
      },
    }),
  ],
  base: '/maj-tools/',
  server: {
    host: true,
  },
})
