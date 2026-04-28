import 'dotenv/config'
console.log('Environment:', process.env.NODE_ENV || 'development')
console.log('Loading environment variables...')

import { app } from './src/app.js'
import { redis } from './src/config/ioredis.js'
import { pg } from './src/db/connection.js'
import { env } from './src/config/env.js'

const PORT = process.env.PORT || env.PORT || 3333

async function startServer() {
  try {
    console.log('Attempting to connect to PostgreSQL...')
    await pg`SELECT 1`
    console.log('✓ PostgreSQL connected')
    
    console.log('Attempting to connect to Redis...')
    await redis.ping()
    console.log('✓ Redis connected')
    
    app.listen(PORT, () => {
      console.log(`✓ Server is running on port http://localhost:${PORT}`)
    }).on('error', (err) => {
      console.error('Server error:', err)
      process.exit(1)
    })
  } catch (err) {
    console.error('✗ Failed to start server:', err.message)
    console.error('Full error:', err)
    process.exit(1)
  }
}

startServer()

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})