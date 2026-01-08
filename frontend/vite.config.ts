import { defineConfig, transformWithEsbuild } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    {
      name: 'treat-jsx-as-tsx',
      enforce: 'pre',
      async transform(code, id) {
        if (id.includes('node_modules') || id.startsWith('\0')) return null
        if (!id.endsWith('.jsx') && !id.endsWith('.js')) return null

        return transformWithEsbuild(code, id, {
          loader: 'tsx',
          target: 'esnext',
          jsx: 'automatic',
        })
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
