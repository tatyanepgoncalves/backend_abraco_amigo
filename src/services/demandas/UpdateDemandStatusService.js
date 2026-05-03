import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate } from '../../lib/utils.js'

export class UpdateDemandStatusService {
  async execute({ demandaId, status, userId }) {
    // Buscar a demanda e o local associado para validar o dono
    const demand = await db
      .select({
        id: schema.demandas.id,
        locationId: schema.demandas.locationId,
        gestorId: schema.demandas.usuarioId,
      })
      .from(schema.demandas)
      .leftJoin(schema.locais, eq(schema.demandas.locationId, schema.locais.id))
      .where(eq(schema.demandas.id, demandaId))
      .limit(1)

    const demandData = demand[0]

    if (!demandData) {
      throw new Error('Demanda não encontrada.')
    }

    // Validação de Propriedade: O usuário logado é o gestor do local desta demanda?
    if (demandData.gestorId !== userId) {
      throw new Error(
        'Você não tem permissão para alterar o status desta demanda.'
      )
    }

    // Atualizar apenas o status
    const [updatedDemand] = await db
      .update(schema.demandas)
      .set({
        status: status.toUpperCase(),
        atualizadoEm: new Date(),
      })
      .where(eq(schema.demandas.id, demandaId))
      .returning()

    return {
      ...updatedDemand,
      locationId: updatedDemand.locationId,
      criadoEm: formatDate(updatedDemand.criadoEm, true),
      atualizadoEm: formatDate(updatedDemand.atualizadoEm, true),
    }
  }
}
