import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  base: process.env.NODE_ENV === 'production' ? '/whoami.github.io/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
