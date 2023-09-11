import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  //服务器设置
  server: {
    open: true,
    port: 9420,
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/935d86475772276cc0f2649e50c82123',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  //路径别名设置
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@a': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@c': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@h': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@r': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@s': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@u': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@v': fileURLToPath(new URL('./src/views', import.meta.url)),
    }
  }
})
