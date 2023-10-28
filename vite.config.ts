import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'vue-form-builder',
      fileName: 'vue-form-builder',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named', /** Disable warning for default imports */
      },
    },
  },
  test: {
    environment: "jsdom"
  },
})
