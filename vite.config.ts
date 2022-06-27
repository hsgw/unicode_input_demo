import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      lang: 'en',
      name: 'Unicode Input Demo',
      short_name: 'unicode',
      background_color: '#fff',
      theme_color: '#333',
      display: 'standalone',
    }}
  )]
})
