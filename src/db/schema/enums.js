import { pgEnum } from 'drizzle-orm/pg-core'

export const userTipoEnum = pgEnum('userTipo', ['GESTOR', 'VOLUNTARIO'])

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
