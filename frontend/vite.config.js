import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';

config();  // Load environment variables from .env file

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
