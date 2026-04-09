import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          monaco: ['@monaco-editor/react'],
          charts: ['recharts'],
          pdf: ['jspdf', 'html2canvas'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', '@monaco-editor/react', 'recharts', 'jspdf', 'html2canvas'],
  },
})