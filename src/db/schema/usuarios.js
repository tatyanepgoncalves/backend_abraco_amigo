import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { userTipoEnum } from './enums.js'

export const usuarios = pgTable('usuarios', {
  id: uuid().primaryKey().defaultRandom(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  telefone: varchar({ length: 20 }).unique(),
  senha: text().notNull(),
  userTipo: userTipoEnum().default('VOLUNTARIO').notNull(),
  endereco: text().unique(),

  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
  atualizadoEm: timestamp({ withTimezone: true }),
  deletadoEm: timestamp({ withTimezone: true }),
})
