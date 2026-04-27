import { Router } from 'express'
import { ApplyToDemandController } from '../controllers/demandas/ApplyToDemandController.js'
import { CreateDemandController } from '../controllers/demandas/CreateDemandController.js'
import { DeleteDemandController } from '../controllers/demandas/DeleteDemandController.js'
import { GetDemandByIdController } from '../controllers/demandas/GetDemandByIdController.js'
import { GetDemandsController } from '../controllers/demandas/GetDemandsController.js'
import { GetUserTasksController } from '../controllers/demandas/GetUserTasksController.js'
import { UpdateDemandController } from '../controllers/demandas/UpdateDemandController.js'
import { UpdateDemandStatusController } from '../controllers/demandas/UpdateDemandStatusController.js'
import { WithdrawFromDemandController } from '../controllers/demandas/WithdrawFromDemandController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { isGestor } from '../middlewares/isGestor.js'

export const demandasRoute = Router()

// Busca todas as demandas com filtros opcionais
demandasRoute.get('/demandas', new GetDemandsController().handle)

// Busca aplicações voluntárias pelo email
demandasRoute.get('/demandas/aplicacoes', new GetUserTasksController().handle)

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

// Deleta uma demanda
demandasRoute.delete(
  '/demandas/:id',
  isAuthenticated,
  isGestor,
  new DeleteDemandController().handle
)
