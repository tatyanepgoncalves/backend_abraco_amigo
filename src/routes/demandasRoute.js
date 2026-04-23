import { Router } from 'express'
import { ApplyToDemandController } from '../controllers/demandas/applyToDemandController.js'
import { CreateDemandController } from '../controllers/demandas/createDemandController.js'
import { GetDemandsController } from '../controllers/demandas/GetDemandsController.js'
import { GetDemandByIdController } from '../controllers/demandas/getDemandByIdController.js'
import { UpdateDemandController } from '../controllers/demandas/updateDemandController.js'
import { UpdateDemandStatusController } from '../controllers/demandas/updateDemandStatusController.js'
import { WithdrawFromDemandController } from '../controllers/demandas/WithdrawFromDemandController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { isGestor } from '../middlewares/isGestor.js'

export const demandasRoute = Router()

// Busca todas as demandas com filtros opcionais
demandasRoute.get(
  '/demandas',
  isAuthenticated,
  new GetDemandsController().handle
)

// Busca demanda pelo id
demandasRoute.get(
  '/demandas/:id',
  isAuthenticated,
  new GetDemandByIdController().handle
)

// Cria uma demanda no sistema
demandasRoute.post(
  '/demandas',
  isAuthenticated,
  isGestor,
  new CreateDemandController().handle
)

// Candidatura de voluntário a demanda
demandasRoute.post(
  '/demandas/candidatura/:id',
  new ApplyToDemandController().handle
)

// Atualiza informações da demandas apenas GESTOR
demandasRoute.put(
  '/demandas/:id',
  isAuthenticated,
  isGestor,
  new UpdateDemandController().handle
)

// Atualiza status da demandas apenas GESTOR
demandasRoute.patch(
  '/demandas/status/:id',
  isAuthenticated,
  isGestor,
  new UpdateDemandStatusController().handle
)

// Desistência de vaga de voluntário
demandasRoute.delete(
  '/demandas/desistencia/:id',
  new WithdrawFromDemandController().handle
)
