import z from 'zod'

export const authUserSchema = z.object({
  body: z.object({
    email: z.email({ message: 'Email inválido' }),
    senha: z
      .string({ message: 'Senha inválida' })
      .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' }),
  }),
})
