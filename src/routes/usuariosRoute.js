import { Router } from 'express'
import { AuthUserController } from '../controllers/usuarios/authUserController.js'
import { CreateUserController } from '../controllers/usuarios/createUserController.js'
import { GetUserDetailController } from '../controllers/usuarios/GetUserDetailController.js'
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
