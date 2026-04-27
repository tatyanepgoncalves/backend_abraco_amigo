import { z } from 'zod'

export const getLocationSchema = z.object({
  nome: z.string().trim().min(1).optional(),
  endereco: z.string().trim().optional(),
  tipoLocal: z.string().optional(),
})
