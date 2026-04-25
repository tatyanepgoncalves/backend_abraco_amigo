import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class DeleteUserService {
  async execute(id) {
    try {
      const userExisting = await db.query.usuarios.findFirst({
        where: eq(schema.usuarios.id, id),
      })

      if (!userExisting) {
        throw new Error('Usuário não encontrado.')
      }

      await db.delete(schema.usuarios).where(eq(schema.usuarios.id, id))

      return {
        message: 'Usuário excluído com sucesso.',
      }
      // biome-ignore lint/complexity/noUselessCatchBinding: it's necessary
      // biome-ignore lint/correctness/noUnusedVariables: it's necessary
    } catch (error) {
      throw new Error('Erro ao excluir usuário.')
    }
  }
}
