import { Router } from 'express'
import { CreateLocationController } from '../controllers/locais/CreateLocationController.js'
import { DeleteLocationByGestorController } from '../controllers/locais/DeleteLocationByGestorController.js'
import { GetLocationController } from '../controllers/locais/GetLocationController.js'
import { UpdateLocationByGestorController } from '../controllers/locais/UpdateLocationByGestorController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { verifyUserRole } from '../middlewares/verifyUserRoute.js'
import { locaisSchema } from '../schema/locais/index.js'

export const locaisRoute = Router()

// Busca todos os locais com filtros opcionais (nome, endereco, tipoLocal)
locaisRoute.get('/locais', new GetLocationController().handle)

// Cria um local para ajuda voluntária.
locaisRoute.post(
  '/locais',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  validateSchema(locaisSchema.createLocationSchema),
  new CreateLocationController().handle
)

// Atualiza as informações do local pelo gestor
locaisRoute.put(
  '/locais',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  validateSchema(locaisSchema.updateLocationSchema),
  new UpdateLocationByGestorController().handle
)

// Deleta o local pelo id
locaisRoute.delete(
  '/locais/:id',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new DeleteLocationByGestorController().handle
)
