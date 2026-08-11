import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Permite rodar em subpastas no GitHub Pages
  plugins: [react()],

  // ── PROXY — redireciona /api/* para o servidor Express (porta 3001)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
