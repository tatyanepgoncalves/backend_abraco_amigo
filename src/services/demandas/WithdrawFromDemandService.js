import { and, eq, sql } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class WithdrawFromDemandService {
  async execute({ demandId, email }) {
    // Verificar se o vínculo existe
    const application = await db.query.voluntariosDemandas.findFirst({
      where: and(
        eq(schema.voluntariosDemandas.demandaId, demandId),
        eq(schema.voluntariosDemandas.email, email)
      ),
    })

    if (!application) {
      throw new Error(
        'Nenhuma candidatura encontrada para este e-mail nesta demanda.'
      )
    }

    // Executar Transação: Remover vínculo + Decrementar Contador
    return await db.transaction(async (tx) => {
      // Remover da tabela pivô
      await tx
        .delete(schema.voluntariosDemandas)
        .where(
          and(
            eq(schema.voluntariosDemandas.demandaId, demandId),
            eq(schema.voluntariosDemandas.email, email)
          )
        )

      // Decrementar o contador na tabela demands
      const [updatedDemand] = await tx
        .update(schema.demandas)
        .set({
          currentVolunteers: sql`GREATEST(${schema.demandas.currentVolunteers} - 1, 0)`,
          atualizadoEm: new Date(),
        })
        .where(eq(schema.demandas.id, demandId))
        .returning()

      return updatedDemand
    })
  }
}
