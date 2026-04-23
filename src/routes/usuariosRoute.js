import { Router } from 'express'
import { AuthUserController } from '../controllers/usuarios/AuthUserController.js'
import { CreateUserController } from '../controllers/usuarios/CreateUserController.js'
import { DeleteUserController } from '../controllers/usuarios/DeleteUserController.js'
import { GetUserDetailController } from '../controllers/usuarios/GetUserDetailController.js'
import { UpdateUserController } from '../controllers/usuarios/UpdateUserController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { schemaUsuarios } from '../schema/usuarios/index.js'

export const usuariosRoute = Router()

// Cadastra novo usuário
usuariosRoute.post(
  '/usuarios',
  validateSchema(schemaUsuarios.createUserSchema),
  new CreateUserController().handle
)

// Acesse conta e retorna um novo token
usuariosRoute.post(
  '/login',
  validateSchema(schemaUsuarios.authUserSchema),
  new AuthUserController().handle
)

// Obter informações de um usuário específico
usuariosRoute.get('/me', isAuthenticated, new GetUserDetailController().handle)

// Atualiza informações de um usuário
usuariosRoute.put(
  '/usuarios',
  isAuthenticated,
  new UpdateUserController().handle
)

// Deleta um usuário by token
usuariosRoute.delete(
  '/usuarios',
  isAuthenticated,
  new DeleteUserController().handle
)
