import { pgEnum } from 'drizzle-orm/pg-core'

export const prioridadeEnum = pgEnum('prioridade', [
  'INDEFINIDO',
  'BAIXO',
  'MÉDIO',
  'ALTO',
  'CRÍTICO',
])

export const statusEnum = pgEnum('status', [
  'ABERTA',
  'EM ANDAMENTO',
  'COMPLETA',
  'CANCELADA',
])
