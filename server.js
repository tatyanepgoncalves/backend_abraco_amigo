import 'dotenv/config'
import { app } from './src/app.js'
import { env } from './src/config/env.js'

const PORT = process.env.PORT || env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
