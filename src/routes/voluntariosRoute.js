import { Router } from 'express'
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
