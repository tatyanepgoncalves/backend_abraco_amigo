import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { demandas } from './demandas.js'

export const voluntariosDemandas = pgTable('voluntariosDemandas', {
  id: uuid().primaryKey().defaultRandom(),

  nome: text().notNull(),
  email: text().notNull(),
  telefone: text(),
  endereco: text().notNull(),

  demandaId: uuid()
    .references(() => demandas.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
})
