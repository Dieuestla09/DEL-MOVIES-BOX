import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tmdbHandler from './api/tmdb.js'

function tmdbDevProxy(apiKey) {
  return {
    name: 'tmdb-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/tmdb', (request, response, next) => {
        const url = request.originalUrl || `/api/tmdb${request.url || ''}`
        const proxyResponse = {
          status(code) {
            response.statusCode = code
            return this
          },
          setHeader(name, value) {
            response.setHeader(name, value)
          },
          json(body) {
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(body))
            return this
          },
        }

        tmdbHandler({ method: request.method, url }, proxyResponse, apiKey).catch(next)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tmdbDevProxy(env.TMDB_API_KEY || env.VITE_TMDB_API_KEY)],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('@mui')) return 'mui-vendor';
            if (id.includes('react-router-dom')) return 'router-vendor';
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
          },
        },
      },
    },
  }
})
