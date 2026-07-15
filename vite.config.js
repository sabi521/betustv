import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        show: resolve(__dirname, 'show.html'),
        video: resolve(__dirname, 'video.html'),
        'video-2': resolve(__dirname, 'video-2.html'),
      },
    },
  },
})
