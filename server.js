import 'dotenv/config'
import { app } from './src/app.js'

const PORT = process.env.PORT || 3333

console.log(process.env.DATABASE_URL)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor online na porta ${PORT}`)
})