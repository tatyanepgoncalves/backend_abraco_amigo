import { Router } from 'express'
import { CreateDemandController } from '../controllers/demandas/createDemandController.js'
import { GetDemandsController } from '../controllers/demandas/GetDemandsController.js'
import { UpdateDemandStatusController } from '../controllers/demandas/updateDemandStatusController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { isGestor } from '../middlewares/isGestor.js'

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
  isGestor,
  new CreateDemandController().handle
)

// Atualiza status da demandas apenas GESTOR
demandasRoute.patch(
  '/demandas/status/:id',
  isAuthenticated,
  isGestor,
  new UpdateDemandStatusController().handle
)
