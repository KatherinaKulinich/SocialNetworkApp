import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  base: '/SocialNetworkApp',
  plugins: [react(), tsconfigPaths()],
  build: { chunkSizeWarningLimit: 1600, },
})
