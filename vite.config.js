import { defineConfig } from 'vite'

export default defineConfig({
  // Capacitor requires assets referenced with relative paths
  base: './',
  build: {
    outDir: 'dist',
  },
})
