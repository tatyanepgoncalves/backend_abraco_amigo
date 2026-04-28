import cors from 'cors'
import express from 'express'
import { demandasRoute } from './routes/demandasRoute.js'
import { gestoresRoute } from './routes/gestoresRoute.js'
import { locaisRoute } from './routes/locaisRoute.js'
import { voluntariosRoute } from './routes/voluntariosRoute.js'

export const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (_, res) => {
  res.json({ message: 'Bem vindo ao Abraço Amigo Server!' })
})

app.use(voluntariosRoute)
app.use(gestoresRoute)
app.use(locaisRoute)
app.use(demandasRoute)
