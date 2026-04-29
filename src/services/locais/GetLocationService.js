import { and, asc, count, eq, ilike, isNull } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class GetLocationService {
  async execute({ nome, endereco, tipoLocal } = {}) {
    const filters = [isNull(schema.locais.deletadoEm)]

    if (nome) {
      filters.push(ilike(schema.locais.nome, `%${nome}%`))
    }

    if (endereco) {
      filters.push(ilike(schema.locais.endereco, `%${endereco}%`))
    }

    if (tipoLocal) {
      filters.push(eq(schema.locais.tipoLocal, tipoLocal))
    }

    // Busca todos os locais unido com o gestor
    const allLocations = await db
      .select({
        id: schema.locais.id,
        nome: schema.locais.nome,
        endereco: schema.locais.endereco,
        telefone: schema.locais.telefone,
        email: schema.locais.email,
        tipoLocal: schema.locais.tipoLocal,
        image: schema.locais.image,
        gestor: {
          id: schema.usuarios.id,
          nome: schema.usuarios.nome,
          email: schema.usuarios.email,
          image: schema.usuarios.image,
        },
        totalDemandas: count(schema.demandas.id),
        criadoEm: schema.locais.criadoEm,
      })
      .from(schema.locais)
      .leftJoin(schema.usuarios, eq(schema.locais.gestorId, schema.usuarios.id))
      .leftJoin(
        schema.demandas,
        eq(schema.demandas.locationId, schema.locais.id)
      )
      .where(and(...filters))
      .groupBy(schema.locais.id, schema.usuarios.id)
      .orderBy(asc(schema.locais.criadoEm))

    return allLocations.map((loc) => ({
      ...loc,
      telefone: formatPhone(loc.telefone),
      criadoEm: formatDate(loc.criadoEm, true),
      totalDemandas: Number(loc.totalDemandas),
    }))
  }
}
