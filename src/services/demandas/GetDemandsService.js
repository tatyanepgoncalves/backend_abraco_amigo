import { and, eq, ilike, isNull } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class GetDemandsService {
  async execute({ titulo, status, prioridade, categoriaId }) {
    const filters = [isNull(schema.demandas.deletadoEm)]

    // Filtros opcionais
    if (titulo) {
      filters.push(ilike(schema.demandas.titulo, `%${titulo}%`))
    }

    if (status) {
      filters.push(eq(schema.demandas.status, status))
    }

    if (prioridade) {
      filters.push(eq(schema.demandas.prioridade, prioridade))
    }

    if (categoriaId) {
      filters.push(eq(schema.demandas.categoriaId, categoriaId))
    }

    const result = await db
      .select({
        id: schema.demandas.id,
        titulo: schema.demandas.titulo,
        descricao: schema.demandas.descricao,
        status: schema.demandas.status,
        prioridade: schema.demandas.prioridade,
        voluntariosNecessarios: schema.demandas.voluntariosNecessarios,
        voluntariosConfirmados: schema.demandas.voluntariosConfirmados,
        categoria: {
          id: schema.categorias.id,
          nome: schema.categorias.nome,
        },
        local: {
          id: schema.locais.id,
          nome: schema.locais.nome,
          endereco: schema.locais.endereco,
        },
        criadoEm: schema.demandas.criadoEm,
      })
      .from(schema.demandas)
      .leftJoin(
        schema.categorias,
        eq(schema.demandas.categoriaId, schema.categorias.id)
      )
      .leftJoin(schema.locais, eq(schema.demandas.locationId, schema.locais.id))
      .where(and(...filters))
      .orderBy(schema.demandas.criadoEm)

    return result
  }
}
