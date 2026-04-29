import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { usuarios } from './usuarios.js'

export const locais = pgTable('locais', {
  id: uuid().primaryKey().defaultRandom(),
  nome: varchar({ length: 255 }).notNull(),
  endereco: text().notNull().unique(),
  telefone: varchar({ length: 20 }).notNull(),
  email: text().unique(),
  gestorId: uuid()
    .references(() => usuarios.id, {
      onDelete: 'cascade',
    })
    .unique(),
  image: text(),

  tipoLocal: text().notNull().default('ABRIGO'),

  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
  atualizadoEm: timestamp({ withTimezone: true }),
  deletadoEm: timestamp({ withTimezone: true }),
})
