import { Router } from 'express'
import { CreateDemandController } from '../controllers/demandas/createDemandController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

export const demandasRoute = Router()

// Cria uma demanda no sistema
demandasRoute.post(
  '/demandas',
  isAuthenticated,
  new CreateDemandController().handle
)
