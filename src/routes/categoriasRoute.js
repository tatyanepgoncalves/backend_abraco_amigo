import { Router } from 'express'
import { CreateCategoriaController } from '../controllers/categorias/CreateCategoriaController.js'
import { DeleteCategoriaController } from '../controllers/categorias/DeleteCategoriaController.js'
import { GetCategoriaController } from '../controllers/categorias/GetCategoriaController.js'
import { UpdateCategoriaController } from '../controllers/categorias/UpdateCategoriaController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { verifyUserRole } from '../middlewares/verifyUserRoute.js'

export const categoriasRoute = Router()

// Rota para listar categorias
categoriasRoute.get('/categorias', new GetCategoriaController().handle)

// Cria categoria
categoriasRoute.post(
  '/categorias',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new CreateCategoriaController().handle
)

// Atualiza categoria
categoriasRoute.put(
  '/categorias/:id',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new UpdateCategoriaController().handle
)

// Deleta categoria
categoriasRoute.delete(
  '/categorias/:id',
  isAuthenticated,
  verifyUserRole('GESTOR'),
  new DeleteCategoriaController().handle
)
