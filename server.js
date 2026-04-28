import 'dotenv/config'
// import { app } from './src/app.js'

import express from 'express'
const appTeste = express()

const PORT = process.env.PORT || 3333

appTeste.get('/', (req, res) => res.send('O servidor subiu!'))

appTeste.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port: ${PORT}`)
})
