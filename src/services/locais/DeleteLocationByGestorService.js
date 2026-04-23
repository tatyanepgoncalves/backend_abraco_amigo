import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class DeleteLocationByGestorService {
  async execute({ locationId, userId }) {
    // Verificar se o local existe e quem é o dono
    const location = await db.query.locais.findFirst({
      where: eq(schema.locais.id, locationId),
    })

    if (!location) {
      throw new Error('Local não encontrado.')
    }

    // Trava de segurança: apenas o gestor responsável pode deletar
    if (location.gestorId !== userId) {
      throw new Error('Você não tem permissão para excluir este local.')
    }

    await db
      .update(schema.locais)
      .set({ deletadoEm: new Date() })
      .where(eq(schema.locais.id, locationId))

    if (location.deletadoEm) {
      throw new Error('Este local já foi excluído anteriormente.')
    }

    return { message: 'Local excluído com sucesso.' }
  }
}
