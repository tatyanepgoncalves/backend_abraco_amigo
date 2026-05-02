import { and, eq, sql } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class ApplyToDemandService {
  async execute({ demandaId, userId }) {
    // Verificar se a demanda existe
    const demand = await db.query.demandas.findFirst({
      where: eq(schema.demandas.id, demandaId),
    })

    if (!demand) {
      throw new Error('Demanda não encontrada.')
    }

    // No seu SQL o status final é 'COMPLETA' ou 'CANCELADA'
    if (demand.status !== 'ABERTA') {
      throw new Error('Esta demanda não está mais aceitando candidaturas.')
    }

    // Verificar se o usuário já se candidatou (voluntarioId)
    const alreadyApplied = await db.query.voluntariosDemandas.findFirst({
      where: and(
        eq(schema.voluntariosDemandas.demandaId, demandaId),
        eq(schema.voluntariosDemandas.voluntarioId, userId) // Ajustado para voluntarioId
      ),
    })

    if (alreadyApplied) {
      throw new Error('Você já está inscrito nesta demanda.')
    }

    // Executar Transação
    return await db.transaction(async (tx) => {
      // Inserir na tabela pivô (voluntariosDemandas)
      await tx.insert(schema.voluntariosDemandas).values({
        demandaId,
        voluntarioId: userId, // Ajustado para bater com o SQL
      })

      // Incrementar o contador e atualizar data
      const [updatedDemand] = await tx
        .update(schema.demandas)
        .set({
          // sql`COALESCE...` garante que se for null, comece do 0
          voluntariosConfirmados: sql`COALESCE(${schema.demandas.voluntariosConfirmados}, 0) + 1`,
          atualizadoEm: new Date(),
        })
        .where(eq(schema.demandas.id, demandaId))
        .returning()

      return updatedDemand
    })
  }
}
