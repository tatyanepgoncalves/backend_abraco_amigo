import { authVolunteerSchema } from './authVolunteerSchema.js'
import { createVolunteerSchema } from './createVolunteerSchema.js'
import { updateVolunteerSchema } from './updateVolunteerSchema.js'

export const schemaVoluntarios = {
  createVolunteerSchema,
  authVolunteerSchema,
  updateVolunteerSchema,
}
