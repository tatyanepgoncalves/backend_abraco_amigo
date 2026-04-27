import { relations } from 'drizzle-orm'
import { demandas } from './demandas.js'
import { gestor } from './gestores.js'
import { locais } from './locais.js'
import { voluntarios } from './voluntarios.js'
import { voluntariosDemandas } from './voluntariosDemandas.js'

export const gestoresRelations = relations(gestor, ({ many }) => ({
  local: many(locais, {
    fields: [gestor.id],
    references: [locais.gestorId],
  }),

  demandas: many(demandas),
}))

export const voluntariosRelations = relations(voluntarios, ({ many }) => ({
  voluntariosDemandas: many(voluntariosDemandas),
}))

export const locaisRelations = relations(locais, ({ many, one }) => ({
  demandas: many(demandas),
  gestor: one(gestor, {
    fields: [locais.gestorId],
    references: [gestor.id],
  }),
}))

export const demandasRelations = relations(demandas, ({ one, many }) => ({
  location: one(locais, {
    fields: [demandas.locationId],
    references: [locais.id],
  }),

  gestor: one(gestor, {
    fields: [demandas.gestorId],
    references: [gestor.id],
  }),

  voluntariosDemandas: many(voluntariosDemandas),
}))

// Relação da Tabela de Junção (Muitos para Muitos)
export const voluntariosDemandasRelations = relations(
  voluntariosDemandas,
  ({ one }) => ({
    demanda: one(demandas, {
      fields: [voluntariosDemandas.demandaId],
      references: [demandas.id],
    }),

    voluntarios: one(voluntarios, {
      fields: [voluntariosDemandas.voluntarioId],
      references: [voluntarios.id],
    }),
  })
)
