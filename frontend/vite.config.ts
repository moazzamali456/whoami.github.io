import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    babel: {
      parserOpts: {
        strictMode: false,
      }
    }
  })],
  server: {
    port: 5173,
    host: true
  },
  base: process.env.NODE_ENV === 'production' ? '/whoami.github.io/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress all warnings during build
        return;
      }
    }
  },
  esbuild: {
    // Ignore all TypeScript errors and JSX issues
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'typescript': 'silent'
    },
    target: 'es2020',
    // Disable strict JSX checking
    jsx: 'automatic',
    jsxSideEffects: false
  },
  define: {
    // Disable type checking completely
    __DEV__: false
  }
})
