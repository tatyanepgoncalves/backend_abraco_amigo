import { Router } from 'express'
import { CreateDemandController } from '../controllers/demandas/createDemandController.js'
import { GetDemandsController } from '../controllers/demandas/getDemandsController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

export const demandasRoute = Router()

// Busca todas as demandas com filtros opcionais
demandasRoute.get(
  '/demandas',
  isAuthenticated,
  new GetDemandsController().handle
)

// Cria uma demanda no sistema
demandasRoute.post(
  '/demandas',
  isAuthenticated,
  new CreateDemandController().handle
)
