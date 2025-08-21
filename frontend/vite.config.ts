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
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress TypeScript warnings during build
        if (warning.code === 'TYPESCRIPT_ERROR') return;
        warn(warning);
      }
    }
  },
  esbuild: {
    // Ignore all TypeScript errors
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
