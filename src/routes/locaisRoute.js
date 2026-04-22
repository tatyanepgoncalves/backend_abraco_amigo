import { Router } from 'express'
import { CreateLocationController } from '../controllers/locais/createLocationController.js'
import { GetLocationByIdController } from '../controllers/locais/getLocationByIdController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

export const locaisRoute = Router()

// Cria um local para ajuda voluntária.
locaisRoute.post(
  '/locais',
  isAuthenticated,
  new CreateLocationController().handle
)

// Busca location pelo id com query
locaisRoute.get(
  '/locais',
  isAuthenticated,
  new GetLocationByIdController().handle
)
