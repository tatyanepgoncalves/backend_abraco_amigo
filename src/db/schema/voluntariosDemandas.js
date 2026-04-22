import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { schema } from './index.js'

export const voluntariosDemandas = pgTable('voluntariosDemandas', {
  id: uuid().primaryKey().defaultRandom(),
  usuarioId: uuid()
    .references(() => schema.usuarios.id, {
      onDelete: 'cascade',
    })
    .unique(),
  demandaId: uuid()
    .references(() => schema.demandas.id, {
      onDelete: 'cascade',
    })
    .unique(),
  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
})
