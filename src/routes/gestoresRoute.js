import { Router } from 'express'
import { CreateManagerController } from '../controllers/gestores/CreateManagerController.js'
import { GetManagerDetailController } from '../controllers/gestores/GetManagerDetailController.js'
import { UpdateManagerController } from '../controllers/gestores/UpdateManagerController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { schemaManagers } from '../schema/gestores/index.js'

export const gestoresRoute = Router()

// Cadastra um novo gestor
gestoresRoute.post(
  '/gestores',
  validateSchema(schemaManagers.createManagerSchema),
  new CreateManagerController().handle
)

// Busca por informações do gestor via token
gestoresRoute.get(
  '/gestores/me',
  isAuthenticated,
  new GetManagerDetailController().handle
)

// Atualiza informações de gestor via token
gestoresRoute.put(
  '/gestores/me',
  isAuthenticated,
  validateSchema(schemaManagers.updateManagerSchema),
  new UpdateManagerController().handle
)
