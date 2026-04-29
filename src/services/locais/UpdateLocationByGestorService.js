import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class UpdateLocationByGestorService {
  async execute({
    id,
    nome,
    endereco,
    email,
    telefone,
    userId,
    image,
    tipoLocal,
  }) {
    if (!id) {
      throw new Error('ID do local é obrigatório.')
    }

    // Verifica se o local existe
    const location = await db.query.locais.findFirst({
      where: eq(schema.locais.id, id),
    })

    if (!location) {
      throw new Error('Local não encontrado.')
    }

    // VALIDAÇÃO CRÍTICA: O usuário logado é o gestor deste local?
    if (location.gestorId !== userId) {
      throw new Error(
        'Você não tem permissão para alterar este local, pois não é o gestor responsável.'
      )
    }

    const [updateLocation] = await db
      .update(schema.locais)
      .set({
        nome,
        endereco,
        email,
        telefone,
        image,
        tipoLocal,
        atualizadoEm: new Date(),
      })
      .where(eq(schema.locais.id, id))
      .returning()

    return {
      ...updateLocation,
      telefone: formatPhone(updateLocation.telefone),
      criadoEm: formatDate(updateLocation.criadoEm, true),
      atualizadoEm: formatDate(updateLocation.atualizadoEm, true),
    }
  }
}
