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
    minify: 'esbuild',
    target: 'es2015',
    // Completely disable all checking and warnings
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress ALL warnings
        return;
      },
      external: [],
      output: {
        manualChunks: undefined
      }
    },
    // Increase chunk size limit to avoid warnings
    chunkSizeWarningLimit: 2000
  },
  esbuild: {
    // Completely ignore TypeScript and JSX errors
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'typescript': 'silent',
      'direct-eval': 'silent'
    },
    target: 'es2015',
    jsx: 'automatic',
    jsxSideEffects: false,
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  define: {
    __DEV__: process.env.NODE_ENV !== 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  // Completely disable TypeScript checking
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2015'
    }
  }
})
