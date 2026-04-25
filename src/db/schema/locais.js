import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { gestor } from './gestores.js'

export const locais = pgTable('locais', {
  id: uuid().primaryKey().defaultRandom(),
  nome: varchar({ length: 255 }).notNull(),
  endereco: text().notNull().unique(),
  telefone: varchar({ length: 20 }).notNull(),
  email: text().unique(),
  gestorId: uuid()
    .references(() => gestor.id, {
      onDelete: 'cascade',
    })
    .unique(),

  tipoLocal: text().notNull().default('ABRIGO'),

  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
  atualizadoEm: timestamp({ withTimezone: true }),
  deletadoEm: timestamp({ withTimezone: true }),
})
