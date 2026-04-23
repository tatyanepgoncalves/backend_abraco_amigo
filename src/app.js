import cors from 'cors'
import express from 'express'
import { locaisRoute } from './routes/locaisRoute.js'
import { usuariosRoute } from './routes/usuariosRoute.js'

export const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
  res.json({ message: 'Bem vindo ao Abraço Amigo Server!' })
})

app.use(usuariosRoute)
app.use(locaisRoute)
