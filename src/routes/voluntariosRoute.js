import { Router } from 'express'
import { AuthVolunteerController } from '../controllers/voluntarios/AuthVolunteerController.js'
import { CreateVolunteerController } from '../controllers/voluntarios/CreateVolunteerController.js'
import { DeleteVolunteerController } from '../controllers/voluntarios/DeleteVolunteerController.js'
import { GetVolunteerDetailController } from '../controllers/voluntarios/GetVolunteerDetailController.js'
import { UpdateVolunteerController } from '../controllers/voluntarios/UpdateVolunteerController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { schemaVoluntarios } from '../schema/voluntarios/index.js'

export const voluntariosRoute = Router()

// Busca informações do usuário via token
voluntariosRoute.get(
  '/voluntarios/me',
  isAuthenticated,
  new GetVolunteerDetailController().handle
)

// Cadastrar novo voluntário
voluntariosRoute.post(
  '/voluntarios',
  validateSchema(schemaVoluntarios.createVolunteerSchema),
  new CreateVolunteerController().handle
)

// Login de voluntário
voluntariosRoute.post(
  '/voluntarios/login',
  validateSchema(schemaVoluntarios.authVolunteerSchema),
  new AuthVolunteerController().handle
)

// Atualiza informações de voluntários
voluntariosRoute.put(
  '/voluntarios/me',
  isAuthenticated,
  validateSchema(schemaVoluntarios.updateVolunteerSchema),
  new UpdateVolunteerController().handle
)

// Deleta voluntário via token
voluntariosRoute.delete(
  '/voluntarios/remocao',
  isAuthenticated,
  new DeleteVolunteerController().handle
)
