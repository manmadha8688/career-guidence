import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
    // The Spline 3D runtime (react-spline + physics) is unavoidably large, but it is
    // already isolated into its own lazy-loaded chunks — it only downloads on the routes
    // that actually render a Spline scene. Raise the limit so those known-heavy, on-demand
    // chunks don't flood the build log with warnings.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Pull React core into its own long-cached vendor chunk. It changes far less
          // often than app code, so browsers can keep it cached across deploys, and the
          // main entry chunk shrinks.
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'react-vendor'
          }
          // framer-motion is used app-wide (and eagerly via MotionConfig). Its own vendor
          // chunk stays cached across deploys and keeps it out of the main entry chunk.
          if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) {
            return 'framer-motion'
          }
          // Monaco editor + its React wrapper are large and only used inside the Code Gym
          // runner (already lazy-imported). Isolate into one long-cached chunk so it never
          // lands in the main entry and stays cached across deploys.
          if (/[\\/]node_modules[\\/](monaco-editor|@monaco-editor)[\\/]/.test(id)) {
            return 'monaco'
          }
        },
      },
    },
  },
})
