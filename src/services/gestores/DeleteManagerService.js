import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class DeleteManagerService {
  async execute(id) {
    try {
      const managerExisting = await db.query.gestor.findFirst({
        where: eq(schema.gestor.id, id),
      })

      if (!managerExisting) {
        throw new Error('Gestor não encontrado.')
      }

      await db
        .update(schema.gestor)
        .set({ deletadoEm: new Date() })
        .where(eq(schema.gestor.id, id))

      return {
        message: 'Gestor excluído com sucesso.',
      }
      // biome-ignore lint/complexity/noUselessCatchBinding: it's necessary
      // biome-ignore lint/correctness/noUnusedVariables: it's necessary
    } catch (error) {
      throw new Error('Erro ao excluir gestor.')
    }
  }
}
