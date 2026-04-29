import { asc, eq, ilike, isNull, sql } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class GetCategoriaService {
  async execute({ nome }) {
    // Definimos os filtros iniciais (ex: busca por nome)
    const filters = [isNull(schema.categorias.deletadaEm)]
    if (nome) {
      filters.push(ilike(schema.categorias.nome, `%${nome}%`))
    }

    const result = await db
      .select({
        id: schema.categorias.id,
        nome: schema.categorias.nome,
        quantidadeDemandas: sql`count(${schema.demandas.id})`.mapWith(Number),
      })
      .from(schema.categorias)
      .leftJoin(
        schema.demandas,
        eq(schema.demandas.categoria, schema.categorias.id)
      )
      .where(filters.length > 0 ? sql`${filters}` : undefined)
      .groupBy(schema.categorias.id)
      .orderBy(asc(schema.categorias.nome))

    return result
  }
}
