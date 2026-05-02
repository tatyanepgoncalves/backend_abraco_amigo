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
import { verifyUserRole } from '../middlewares/verifyUserRoute.js'

export const demandasRoute = Router()

// Busca todas as demandas com filtros opcionais
demandasRoute.get('/demandas', new GetDemandsController().handle)

// Busca aplicações voluntárias pelo id
demandasRoute.get('/demandas/aplicacoes', new GetUserTasksController().handle)

// Busca demanda pelo id
demandasRoute.get('/demandas/:id', new GetDemandByIdController().handle)

// Cria uma demanda no sistema
demandasRoute.post(
  '/demandas',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new CreateDemandController().handle
)

// Candidatura de voluntário a demanda
demandasRoute.post(
  '/demandas/candidatura',
  new ApplyToDemandController().handle
)

// Atualiza informações da demandas apenas GESTOR
demandasRoute.put(
  '/demandas/:id',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new UpdateDemandController().handle
)

// Atualiza status da demandas apenas GESTOR
demandasRoute.patch(
  '/demandas/status/:id',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new UpdateDemandStatusController().handle
)

// Desistência de vaga de voluntário
demandasRoute.delete(
  '/demandas/desistencia',
  isAuthenticated,
  verifyUserRole('VOLUNTARIO'),
  new WithdrawFromDemandController().handle
)

// Deleta uma demanda
demandasRoute.delete(
  '/demandas/remocao',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new DeleteDemandController().handle
)
