import { authUserSchema } from './authUserSchema.js'
import { createUserSchema } from './createUserSchema.js'
import { updateUserSchema } from './updateUserSchema.js'

export const schemaUsers = {
  createUserSchema,
  authUserSchema,
  updateUserSchema,
}
