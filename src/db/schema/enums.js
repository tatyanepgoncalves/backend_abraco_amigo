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

export const categoriaEnum = pgEnum('categoria_enum', [
  'SAUDE',
  'ALIMENTOS',
  'EDUCACAO',
  'MEIO AMBIENTE',
  'OUTROS',
])
