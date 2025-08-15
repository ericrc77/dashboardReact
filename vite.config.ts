import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base para GitHub Pages: agora apontando para o novo repositório dashboardReact
const base = '/dashboardReact/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react()
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
