import { defineConfig } from 'vite'
import { cpSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        base: resolve(__dirname, 'base.html')
      }
    }
  },
  plugins: [
    {
      name: 'copy-tracks',
      generateBundle() {
        const tracksDir = resolve(__dirname, 'tracks')
        const distTracksDir = resolve(__dirname, 'dist', 'tracks')
        
        if (existsSync(tracksDir)) {
          cpSync(tracksDir, distTracksDir, { recursive: true })
        }
      }
    }
  ]
})