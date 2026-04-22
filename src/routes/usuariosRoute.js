import { Router } from 'express'
import { AuthUserController } from '../controllers/usuarios/authUserController.js'
import { CreateUserController } from '../controllers/usuarios/createUserController.js'
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
