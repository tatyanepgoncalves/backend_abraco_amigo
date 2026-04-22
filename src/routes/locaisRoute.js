import { Router } from 'express'
import { CreateLocationController } from '../controllers/locais/createLocationController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

export const locaisRoute = Router()

// Cria um local para ajuda voluntária.
locaisRoute.post(
  '/locais',
  isAuthenticated,
  new CreateLocationController().handle
)
