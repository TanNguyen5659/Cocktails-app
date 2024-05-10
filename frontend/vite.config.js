import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v3': {
        target: 'https://api.yelp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v3/, '')
      },
    },
  },
})