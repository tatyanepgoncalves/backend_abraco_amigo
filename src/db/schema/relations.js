import { relations } from 'drizzle-orm'
import { demandas } from './demandas.js'
import { locais } from './locais.js'
import { usuarios } from './usuarios.js'
import { voluntariosDemandas } from './voluntariosDemandas.js'

export const usuariosRelations = relations(usuarios, ({ one, many }) => ({
  local: one(locais, {
    fields: [usuarios.id],
    references: [locais.gestorId],
  }),
  voluntariosDemandas: many(voluntariosDemandas),
  demandas: many(demandas, {
    relationName: 'autorDaDemanda',
  }),
}))

export const locaisRelations = relations(locais, ({ many, one }) => ({
  demandas: many(demandas),
  gestor: one(usuarios, {
    fields: [locais.gestorId],
    references: [usuarios.id],
  }),
}))

export const demandasRelations = relations(demandas, ({ one, many }) => ({
  location: one(locais, {
    fields: [demandas.locationId],
    references: [locais.id],
    relationName: 'autorDaDemanda',
  }),

  voluntariosDemandas: many(voluntariosDemandas),
}))

// Relação da Tabela de Junção (Muitos para Muitos)
export const voluntariosDemandasRelations = relations(
  voluntariosDemandas,
  ({ one }) => ({
    usuario: one(usuarios, {
      fields: [voluntariosDemandas.usuarioId],
      references: [usuarios.id],
    }),
    demanda: one(demandas, {
      fields: [voluntariosDemandas.demandaId],
      references: [demandas.id],
    }),
  })
)
