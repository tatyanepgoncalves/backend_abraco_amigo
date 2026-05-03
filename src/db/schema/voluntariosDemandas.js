import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { demandas } from './demandas.js'
import { usuarios } from './usuarios.js'

export const voluntariosDemandas = pgTable('voluntariosDemandas', {
  id: uuid().primaryKey().defaultRandom(),

  voluntarioId: uuid()
    .references(() => usuarios.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  demandaId: uuid()
    .references(() => demandas.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
})
