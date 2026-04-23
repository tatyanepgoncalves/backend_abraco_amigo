import { and, eq, sql } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class ApplyToDemandService {
  async execute({ demandaId, dadosVoluntario }) {
    const { nome, email, telefone, endereco } = dadosVoluntario

    //  Verificar se a demanda existe e está aberta
    const demand = await db.query.demandas.findFirst({
      where: eq(schema.demandas.id, demandaId),
    })

    if (!demand) {
      throw new Error('Demanda não encontrada.')
    }

    if (demand.status === 'CONCLUIDA') {
      throw new Error('Esta demanda já foi finalizada.')
    }

    //  Verificar se o usuário já se candidatou (evitar duplicidade)
    const alreadyApplied = await db.query.voluntariosDemandas.findFirst({
      where: and(
        eq(schema.voluntariosDemandas.demandaId, demandaId),
        eq(schema.voluntariosDemandas.email, email)
      ),
    })

    if (alreadyApplied) {
      throw new Error(
        'Este e-mail já foi usado para se candidatar a esta demanda.'
      )
    }

    // Executar Transação: Criar vínculo + Incrementar Contador
    return await db.transaction(async (tx) => {
      // Inserir na tabela pivô
      await tx.insert(schema.voluntariosDemandas).values({
        demandaId,
        nome,
        email,
        telefone,
        endereco,
      })

      // Incrementar o contador currentVolunteers na tabela demands
      const [updatedDemand] = await tx
        .update(schema.demandas)
        .set({
          currentVolunteers: sql`${schema.demandas.currentVolunteers} + 1`,
          voluntariosConfirmados: sql`COALESCE(${schema.demandas.voluntariosConfirmados}, 0) + 1`,
          atualizadoEm: new Date(),
        })
        .where(eq(schema.demandas.id, demandaId))
        .returning()

      return updatedDemand
    })
  }
}
