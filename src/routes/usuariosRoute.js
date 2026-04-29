import { Router } from 'express'
import { AuthUserController } from '../controllers/usuarios/AuthUserController.js'
import { CreateUserController } from '../controllers/usuarios/CreateUserController.js'
import { DeleteUserController } from '../controllers/usuarios/DeleteUserController.js'
import { GetUserDetailController } from '../controllers/usuarios/GetUserDetailController.js'
import { LogoutUserController } from '../controllers/usuarios/LogoutUserController.js'
import { UpdateUserController } from '../controllers/usuarios/UpdateUserController.js'
import { authorizeSelfOrGestor } from '../middlewares/getRole.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { schemaUsers } from '../schema/usuarios/index.js'

export const usuariosRoute = Router()

// Busca por informações do gestor via token
usuariosRoute.get('/me', isAuthenticated, new GetUserDetailController().handle)

// Cadastra um novo gestor
usuariosRoute.post(
  '/usuarios',
  validateSchema(schemaUsers.createUserSchema),
  new CreateUserController().handle
)

// Autenticação para usuário
usuariosRoute.post(
  '/login',
  validateSchema(schemaUsers.authUserSchema),
  new AuthUserController().handle
)

// Logout do usuário
usuariosRoute.post(
  '/logout',
  isAuthenticated,
  new LogoutUserController().handle
)

// Atualiza informações de gestor via token
usuariosRoute.put(
  '/me',
  isAuthenticated,
  validateSchema(schemaUsers.updateUserSchema),
  new UpdateUserController().handle
)

// Deleta gestor via token
usuariosRoute.delete(
  '/usuarios',
  isAuthenticated,
  authorizeSelfOrGestor,
  new DeleteUserController().handle
)
