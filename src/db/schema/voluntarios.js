import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const voluntarios = pgTable('voluntarios', {
  id: uuid().primaryKey().defaultRandom(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  telefone: varchar({ length: 20 }).unique(),
  senha: text().notNull(),
  endereco: text().unique(),
  image: text(),
  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
  atualizadoEm: timestamp({ withTimezone: true }),
  deletadoEm: timestamp({ withTimezone: true }),
})
