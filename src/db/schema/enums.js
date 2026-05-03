import { pgEnum } from 'drizzle-orm/pg-core'

export const prioridadeEnum = pgEnum('prioridade', [
  'BAIXA',
  'MÉDIA',
  'ALTA',
  'CRÍTICA',
])

export const statusEnum = pgEnum('status', ['ABERTA', 'COMPLETA', 'CANCELADA'])

export const tipoUserEnum = pgEnum('tipoUser', ['GESTOR', 'VOLUNTARIO'])
