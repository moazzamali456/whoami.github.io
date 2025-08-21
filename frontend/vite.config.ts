import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
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
        // Suppress all warnings during build
        return;
      }
    }
  },
  esbuild: {
    // Ignore all TypeScript errors
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'typescript': 'silent'
    },
    target: 'es2020'
  },
  define: {
    // Disable type checking completely
    __DEV__: false
  }
})
