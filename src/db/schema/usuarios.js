import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { tipoUserEnum } from './enums.js'

export const usuarios = pgTable('usuarios', {
  id: uuid().primaryKey().defaultRandom(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  telefone: varchar({ length: 20 }).unique(),
  senha: text().notNull(),
  endereco: text().unique(),
  image: text(),
  tipoUsuario: tipoUserEnum().default('VOLUNTARIO').notNull(),

  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
  atualizadoEm: timestamp({ withTimezone: true }),
  deletadoEm: timestamp({ withTimezone: true }),
})
