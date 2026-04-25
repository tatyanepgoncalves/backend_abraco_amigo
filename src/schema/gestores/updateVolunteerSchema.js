import z from 'zod'

export const updateManagerSchema = z.object({
  body: z.object({
    nome: z.string({ message: 'Nome inválido' }).optional(),
    email: z.email({ message: 'Email inválido' }).optional(),
    senha: z
      .string({ message: 'Senha inválida' })
      .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
      .optional(),
    telefone: z.string({ message: 'Telefone inválido' }).optional(),
    endereco: z.string({ message: 'Endereço inválido' }).optional(),
  }),
})
