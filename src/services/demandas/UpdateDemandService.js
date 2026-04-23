import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class UpdateDemandService {
  async execute({ demandId, data }) {
    // Buscar a demanda com o local para validar permissão
    const demand = await db.query.demandas.findFirst({
      where: eq(schema.demandas.id, demandId),
    })

    if (!demand) {
      throw new Error('Demanda não encontrada.')
    }

    // Atualizar os dados
    const [updatedDemand] = await db
      .update(schema.demandas)
      .set({
        titulo: data.titulo ?? demand.titulo,
        descricao: data.descricao ?? demand.descricao,
        prioridade: data.prioridade
          ? data.prioridade.toUpperCase()
          : demand.prioridade,
        voluntariosNecessarios:
          data.voluntariosNecessarios === undefined
            ? demand.voluntariosNecessarios
            : Number(data.voluntariosNecessarios),
        atualizadoEm: new Date(),
      })
      .where(eq(schema.demandas.id, demandId))
      .returning()

    return updatedDemand
  }
}
