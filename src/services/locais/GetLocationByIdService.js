import { and, count, eq, inArray } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class GetLocationByIdService {
  async execute(locationId) {
    // Busca os detalhes do local unido com o gestor
    const location = await db
      .select({
        id: schema.locais.id,
        nome: schema.locais.nome,
        telefone: schema.locais.telefone,
        endereco: schema.locais.endereco,
        email: schema.locais.email,
        gestor: {
          id: schema.usuarios.id,
          nome: schema.usuarios.nome,
          email: schema.usuarios.email,
        },

        criadoEm: schema.locais.criadoEm,
        atualizadoEm: schema.locais.atualizadoEm,
        deletadoEm: schema.locais.deletadoEm,
      })
      .from(schema.locais)
      .leftJoin(schema.usuarios, eq(schema.locais.gestorId, schema.usuarios.id))
      .where(eq(schema.locais.id, locationId))
      .limit(1)

    if (location.length === 0) {
      throw new Error('Local não encontrado.')
    }

    // Contador de demandas que estão 'ABERTA' e 'EM ANDAMENTO'
    const [demandsCount] = await db
      .select({ total: count(schema.demandas.id) })
      .from(schema.demandas)
      .where(
        and(
          eq(schema.demandas.locationId, locationId),
          inArray(schema.demandas.status, ['ABERTA', 'EM ANDAMENTO'])
        )
      )

    // Busca as demandas ativas deste local (ex: apenas 'ABERTA' e 'EM ANDAMENTO')
    const activeDemands = await db
      .select()
      .from(schema.demandas)
      .where(
        and(
          eq(schema.demandas.locationId, locationId),
          inArray(schema.demandas.status, ['ABERTA', 'EM ANDAMENTO'])
        )
      )
      .orderBy(schema.demandas.prioridade)

    return {
      ...location[0],
      telefone: formatPhone(location[0].telefone),
      criadoEm: formatDate(location[0].criadoEm, true),
      atualizadoEm: formatDate(location[0].atualizadoEm, true),
      deletadoEm: formatDate(location[0].deletadoEm, true),

      totalDemandas: Number(demandsCount.total),
      demandas: activeDemands.map((d) => ({
        ...d,
        criadoEm: formatDate(d.criadoEm, true),
      })),
    }
  }
}
