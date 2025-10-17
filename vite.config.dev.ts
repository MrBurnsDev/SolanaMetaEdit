import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Development config for Replit - binds to 0.0.0.0:5000
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
  },
})
