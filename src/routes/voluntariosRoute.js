import { Router } from 'express'
import { AuthVolunteerController } from '../controllers/voluntarios/AuthVolunteerController.js'
import { CreateVolunteerController } from '../controllers/voluntarios/CreateVolunteerController.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { schemaVoluntarios } from '../schema/voluntarios/index.js'

export const voluntariosRoute = Router()

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
