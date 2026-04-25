import { Router } from 'express'
import { CreateManagerController } from '../controllers/gestores/CreateManagerController.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { schemaManagers } from '../schema/gestores/index.js'

export const gestoresRoute = Router()

// Cadastra um novo gestor
gestoresRoute.post(
  '/gestores',
  validateSchema(schemaManagers.createManagerSchema),
  new CreateManagerController().handle
)
