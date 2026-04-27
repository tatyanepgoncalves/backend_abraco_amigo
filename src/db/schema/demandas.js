import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { categoriaEnum, prioridadeEnum, statusEnum } from './enums.js'
import { gestor } from './gestores.js'
import { locais } from './locais.js'

export const demandas = pgTable('demandas', {
  id: uuid().primaryKey().defaultRandom(),
  gestorId: uuid()
    .references(() => gestor.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  locationId: uuid()
    .references(() => locais.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  titulo: text().notNull(),
  descricao: text().notNull(),
  voluntariosNecessarios: integer().notNull().default(0),
  voluntariosConfirmados: integer().default(0),
  prioridade: prioridadeEnum().default('INDEFINIDO').notNull(),
  status: statusEnum().default('ABERTA').notNull(),
  categoria: categoriaEnum().default('OUTROS').notNull(),

  criadoEm: timestamp({ withTimezone: true }).defaultNow().notNull(),
  atualizadoEm: timestamp({ withTimezone: true }),
  deletadoEm: timestamp({ withTimezone: true }),
})
