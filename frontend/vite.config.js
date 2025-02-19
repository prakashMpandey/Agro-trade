import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{'events': 'events-browserify',
      'url': 'url-browserify',
      'http': 'stream-http',
      'path': 'path-browserify',
      'buffer': 'buffer-browserify'}},
      
  server:{
    host:true
  }
})
