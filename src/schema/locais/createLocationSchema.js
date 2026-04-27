import z from 'zod'

export const createLocationSchema = z.object({
  body: z.object({
    nome: z.string().trim().min(1),
    telefone: z.string().trim().min(10).max(15).optional(),
    endereco: z.string().trim().min(1).optional(),
    email: z.string().email().optional(),
    tipoLocal: z.string().optional().default('ABRIGO'),
  }),
})
