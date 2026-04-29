import cors from 'cors'
import express from 'express'
import { categoriasRoute } from './routes/categoriasRoute.js'
import { locaisRoute } from './routes/locaisRoute.js'
import { usuariosRoute } from './routes/usuariosRoute.js'

export const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use(express.json())

app.get('/', (_, res) => {
  res.json({ message: 'Bem vindo ao Abraço Amigo Server!' })
})

app.use(usuariosRoute)
app.use(locaisRoute)
app.use(categoriasRoute)
