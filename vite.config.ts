import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { githubPagesSpa } from '@sctg/vite-plugin-github-pages-spa'; 

const base = process.env.NODE_ENV === 'production' ? '/headless-menu/' : '/';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss(), githubPagesSpa()],
   base, 
})
