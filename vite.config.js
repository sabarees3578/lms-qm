import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    host: '127.0.0.1'
  },
  preview: {
    port: 8081,
    host: '127.0.0.1',
    allowedHosts: ['kiqgo7hzqssgqvt3uwldllr2.103.98.192.11.sslip.io']
  }
})
