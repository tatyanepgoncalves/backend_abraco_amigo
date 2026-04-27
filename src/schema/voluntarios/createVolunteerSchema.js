import { z } from 'zod'

export const createVolunteerSchema = z.object({
  body: z.object({
    nome: z
      .string({ message: 'O nome precisa ser texto.' })
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
    email: z.email({
      message: 'O email precisa ser um endereço de email válido.',
    }),
    senha: z
      .string({ message: 'A senha precisa ser texto.' })
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
  }),
})
