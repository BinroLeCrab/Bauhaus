import { defineConfig } from 'vite'
import { copyFileSync, cpSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
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