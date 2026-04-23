import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class GetDemandByIdService {
  async execute(demandId) {
    // Busca os detalhes da demanda e os dados do local
    const demand = await db
      .select({
        id: schema.demandas.id,
        titulo: schema.demandas.titulo,
        descricao: schema.demandas.descricao,
        status: schema.demandas.status,
        prioridade: schema.demandas.prioridade,
        criadoEm: schema.demandas.criadoEm,
        local: {
          nome: schema.locais.nome,
          endereco: schema.locais.endereco,
          telefone: schema.locais.telefone,
          email: schema.locais.email,
        },
      })
      .from(schema.demandas)
      .leftJoin(schema.locais, eq(schema.demandas.locationId, schema.locais.id))
      .where(eq(schema.demandas.id, demandId))
      .limit(1)

    if (demand.length === 0) {
      throw new Error('Demanda não encontrada.')
    }

    //  Busca os voluntários que se inscreveram nesta demanda
    const volunteers = await db
      .select({
        id: schema.usuarios.id,
        nome: schema.usuarios.nome,
        email: schema.usuarios.email,
      })
      .from(schema.voluntariosDemandas)
      .innerJoin(
        schema.usuarios,
        eq(schema.voluntariosDemandas.usuarioId, schema.usuarios.id)
      )
      .where(eq(schema.voluntariosDemandas.demandaId, demandId))

    return {
      ...demand[0],
      voluntarios: volunteers,
    }
  }
}
