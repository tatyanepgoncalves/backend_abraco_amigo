import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class DeleteVolunteerService {
  async execute(id) {
    try {
      const volunteerExisting = await db.query.voluntarios.findFirst({
        where: eq(schema.voluntarios.id, id),
      })

      if (!volunteerExisting) {
        throw new Error('Voluntário não encontrado.')
      }

      await db
        .update(schema.voluntarios)
        .set({ deletadoEm: new Date() })
        .where(eq(schema.voluntarios.id, id))

      return {
        message: 'Voluntário excluído com sucesso.',
      }
      // biome-ignore lint/complexity/noUselessCatchBinding: it's necessary
      // biome-ignore lint/correctness/noUnusedVariables: it's necessary
    } catch (error) {
      throw new Error('Erro ao excluir voluntário.')
    }
  }
}
