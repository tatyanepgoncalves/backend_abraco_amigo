import { Router } from 'express'
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
