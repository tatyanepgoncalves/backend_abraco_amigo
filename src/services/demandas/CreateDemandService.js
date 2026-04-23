import { and, eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate } from '../../lib/utils.js'

export class CreateDemandService {
  async execute({
    titulo,
    descricao,
    prioridade,
    locationId,
    userId,
    voluntariosNecessarios,
  }) {
    // Validar se o local existe e se pertence ao gestor logado
    const location = await db.query.locais.findFirst({
      where: and(
        eq(schema.locais.id, locationId),
        eq(schema.locais.gestorId, userId)
      ),
    })

    if (!location) {
      throw new Error(
        'Local não encontrado ou você não tem permissão para gerenciar este local.'
      )
    }

    if (location.gestorId !== userId) {
      throw new Error('Você não tem permissão para gerenciar este local.')
    }

    // Criar a demanda
    const [newDemand] = await db
      .insert(schema.demandas)
      .values({
        titulo,
        descricao,
        prioridade: prioridade.toUpperCase(),
        locationId,
        usuarioId: userId,
        voluntariosNecessarios: Number(voluntariosNecessarios) || 1,
        status: 'ABERTA', // Status inicial padrão
        criadoEm: new Date(),
      })
      .returning()

    return { ...newDemand, criadoEm: formatDate(newDemand.criadoEm, true) }
  }
}
