import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const categorias = pgTable('categorias', {
  id: uuid().primaryKey().defaultRandom(),
  nome: text().notNull().unique(),

  criadoEm: timestamp().notNull().defaultNow(),
  atualizadoEm: timestamp().defaultNow(),
  deletadaEm: timestamp(),
})
