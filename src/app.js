import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { categoriasRoute } from './routes/categoriasRoute.js'
import { demandasRoute } from './routes/demandasRoute.js'
import { locaisRoute } from './routes/locaisRoute.js'
import { usuariosRoute } from './routes/usuariosRoute.js'

export const app = express()

app.use(cookieParser)

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
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
app.use(demandasRoute)
