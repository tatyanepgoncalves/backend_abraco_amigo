import 'dotenv/config'
console.log('Loading environment variables...')

import { app } from './src/app.js'
console.log('App imported successfully')

import { env } from './src/config/env.js'
console.log('Environment config loaded:', { PORT: env.PORT, NODE_ENV: env.NODE_ENV })

const PORT = process.env.PORT || env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error('Server error:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})
