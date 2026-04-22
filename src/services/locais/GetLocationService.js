import { asc, count, eq, isNull } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class GetLocationService {
  async execute() {
    // Busca todos os locais unido com o gestor
    const allLocations = await db
      .select({
        id: schema.locais.id,
        nome: schema.locais.nome,
        endereco: schema.locais.endereco,
        telefone: schema.locais.telefone,
        email: schema.locais.email,

        gestor: {
          id: schema.usuarios.id,
          nome: schema.usuarios.nome,
          email: schema.usuarios.email,
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
      .where(isNull(schema.locais.deletadoEm))
      .groupBy(schema.locais.id, schema.usuarios.id)
      .orderBy(asc(schema.locais.criadoEm))

    // Formata o retorno para garantir que o total seja um número
    return allLocations.map((loc) => ({
      ...loc,
      telefone: formatPhone(loc.telefone),
      criadoEm: formatDate(loc.criadoEm, true),

      totalDemandas: Number(loc.totalDemandas),
    }))
  }
}
