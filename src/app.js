import cors from 'cors'
import express from 'express'
import { gestoresRoute } from './routes/gestoresRoute.js'
import { voluntariosRoute } from './routes/voluntariosRoute.js'

export const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
  res.json({ message: 'Bem vindo ao Abraço Amigo Server!' })
})

app.use(voluntariosRoute)
app.use(gestoresRoute)
