import { Router } from 'express'
import { CreateLocationController } from '../controllers/locais/createLocationController.js'
import { DeleteLocationByGestorController } from '../controllers/locais/deleteLocationByGestorController.js'
import { GetLocationByIdController } from '../controllers/locais/getLocationByIdController.js'
import { GetLocationController } from '../controllers/locais/getLocationController.js'
import { UpdateLocationByGestorController } from '../controllers/locais/updateLocationByGestorController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { isGestor } from '../middlewares/isGestor.js'

export const locaisRoute = Router()

// Busca todos os locais para ajuda voluntária
locaisRoute.get('/locais', isAuthenticated, new GetLocationController().handle)

// Cria um local para ajuda voluntária.
locaisRoute.post(
  '/locais',
  isAuthenticated,
  new CreateLocationController().handle
)

// Busca location pelo id com params
locaisRoute.get(
  '/locais/:id',
  isAuthenticated,
  new GetLocationByIdController().handle
)

// Atualiza as informações do local pelo gestor
locaisRoute.put(
  '/locais',
  isAuthenticated,
  isGestor,
  new UpdateLocationByGestorController().handle
)

// Deleta o local pelo id
locaisRoute.delete(
  '/locais/:id',
  isAuthenticated,
  new DeleteLocationByGestorController().handle
)
