import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class DeleteDemandService {
  async execute({ demandaId, userId }) {
    // Buscar a demanda com o local para validar a propriedade
    const demand = await db.query.demandas.findFirst({
      where: eq(schema.demandas.id, demandaId),
    })

    if (!demand) {
      throw new Error('Demanda não encontrada.')
    }

    // Trava de segurança: O gestor logado é o dono do local?
    if (demand.usuarioId !== userId) {
      throw new Error('Você não tem permissão para excluir esta demanda.')
    }

    // Verificar se já foi deletada
    if (demand.deletadoEm) {
      throw new Error('Esta demanda já foi excluída anteriormente.')
    }

    // Executar o Soft Delete
    await db
      .update(schema.demandas)
      .set({ deletadoEm: new Date() })
      .where(eq(schema.demandas.id, demandaId))

    return { message: 'Demanda removida com sucesso.' }
  }
}
