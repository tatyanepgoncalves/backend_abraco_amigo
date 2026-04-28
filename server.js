import 'dotenv/config'

const PORT = process.env.PORT || 3333

import express from 'express'
const app = express()

app.get('/', (req, res) => res.send('O servidor subiu sem o banco!'))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 TESTE: Servidor online na porta ${PORT}`)
})