import { and, eq, sql } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class WithdrawFromDemandService {
  async execute({ demandaId, userId }) {
    // Verificar se o vínculo existe
    const application = await db.query.voluntariosDemandas.findFirst({
      where: and(
        eq(schema.voluntariosDemandas.demandaId, demandaId),
        eq(schema.voluntariosDemandas.voluntarioId, userId)
      ),
    })

    if (!application) {
      throw new Error(
        'Você não possui uma candidatura ativa para esta demanda.'
      )
    }

    // Verificar se a demanda ainda permite alterações (não está completa/cancelada)
    const demand = await db.query.demandas.findFirst({
      where: eq(schema.demandas.id, demandaId),
    })

    if (demand?.status !== 'ABERTA') {
      throw new Error(
        'Não é possível desistir de uma demanda que já foi finalizada ou cancelada.'
      )
    }

    // Executar Transação: Remover vínculo + Decrementar Contador
    return await db.transaction(async (tx) => {
      // Remover da tabela pivô
      await tx
        .delete(schema.voluntariosDemandas)
        .where(
          and(
            eq(schema.voluntariosDemandas.demandaId, demandaId),
            eq(schema.voluntariosDemandas.voluntarioId, userId)
          )
        )

      // Decrementar o contador na tabela demands
      const [updatedDemand] = await tx
        .update(schema.demandas)
        .set({
          voluntariosConfirmados: sql`GREATEST(${schema.demandas.voluntariosConfirmados} - 1, 0)`,
          atualizadoEm: new Date(),
        })
        .where(eq(schema.demandas.id, demandaId))
        .returning()

      return updatedDemand
    })
  }
}
