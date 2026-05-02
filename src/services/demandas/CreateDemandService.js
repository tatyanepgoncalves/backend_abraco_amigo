import { and, eq, isNull } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate } from '../../lib/utils.js'

export class CreateDemandService {
  async execute({
    titulo,
    descricao,
    prioridade,
    locationId,
    categoriaId,
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

    // Verifica se categoria existe
    const categoria = await db.query.categorias.findFirst({
      where: and(
        eq(schema.categorias.id, categoriaId),
        isNull(schema.categorias.deletadaEm)
      ),
    })

    if (!categoria) {
      throw new Error('Categoria inválida ou inexistente.')
    }

    // Criar a demanda
    const [newDemand] = await db
      .insert(schema.demandas)
      .values({
        titulo,
        descricao,
        prioridade: prioridade.toUpperCase(),
        locationId,
        gestorId: userId,
        categoriaId,
        voluntariosNecessarios: Number(voluntariosNecessarios) || 1,
        voluntariosConfirmados: 0,
        status: 'ABERTA',
      })
      .returning()

    return { ...newDemand, criadoEm: formatDate(newDemand.criadoEm, true) }
  }
}
