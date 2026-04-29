import { relations } from 'drizzle-orm'
import { categorias } from './categorias.js'
import { demandas } from './demandas.js'
import { locais } from './locais.js'
import { usuarios } from './usuarios.js'
import { voluntariosDemandas } from './voluntariosDemandas.js'

export const usuariosRelations = relations(usuarios, ({ many }) => ({
  demandasCriadas: many(demandas),
  inscricoes: many(voluntariosDemandas),
  locaisGerenciados: many(locais),
}))

// Relacionamentos para Demandas
export const demandasRelations = relations(demandas, ({ one, many }) => ({
  gestor: one(usuarios, {
    fields: [demandas.gestorId],
    references: [usuarios.id],
  }),
  local: one(locais, {
    fields: [demandas.locationId],
    references: [locais.id],
  }),
  categoria: one(categorias, {
    fields: [demandas.categoria],
    references: [categorias.id],
  }),
  candidatos: many(voluntariosDemandas),
}))

// Relacionamentos para Locais
export const locaisRelations = relations(locais, ({ one, many }) => ({
  gestor: one(usuarios, {
    fields: [locais.gestorId],
    references: [usuarios.id],
  }),
  demandas: many(demandas),
}))

// Relacionamentos para Categorias
export const categoriasRelations = relations(categorias, ({ many }) => ({
  demandas: many(demandas),
}))

// Tabela Pivô (N:N) - Conecta Voluntário e Demanda
export const voluntariosDemandasRelations = relations(
  voluntariosDemandas,
  ({ one }) => ({
    voluntario: one(usuarios, {
      fields: [voluntariosDemandas.voluntarioId],
      references: [usuarios.id],
    }),
    demanda: one(demandas, {
      fields: [voluntariosDemandas.demandaId],
      references: [demandas.id],
    }),
  })
)
