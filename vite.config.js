import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vercel serves from root; GitHub Pages may use subpath
  base: process.env.VERCEL ? '/' : '/my-portfolio/',
});
