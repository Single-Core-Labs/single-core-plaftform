import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React Router family
            if (id.includes('react-router') || id.includes('@remix-run')) {
              return 'router'
            }
            // Lucide icons — bundle together instead of one file per icon
            if (id.includes('lucide-react')) {
              return 'ui'
            }
            // React + ReactDOM + scheduler
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-vendor'
            }
            // Heavy animation libraries
            if (id.includes('framer-motion') || id.includes('lenis')) {
              return 'animation'
            }
          }
        },
      },
    },
  },
})