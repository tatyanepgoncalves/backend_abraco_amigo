import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'
import { CreateLocationService } from '../../services/locais/CreateLocationService.js'

export class CreateLocationController {
  async handle(req, res) {
    const { nome, endereco, telefone, email, tipoLocal } = req.body

    const gestorId = req.user_id

    // Busca o usuário no banco para verificar o tipo
    const usuario = await db.query.usuarios.findFirst({
      where: eq(schema.usuarios.id, gestorId),
    })

    // Se for gestor, prossegue com a criação
    if (!usuario || usuario.userTipo !== 'GESTOR') {
      return res.status(403).json({
        error: 'Acesso negado. Apenas gestores podem cadastrar novos locais.',
      })
    }

    const createLocationService = new CreateLocationService()

    try {
      const location = await createLocationService.execute({
        nome,
        endereco,
        telefone,
        email,
        gestorId,
        tipoLocal,
      })
      return res.status(201).json({
        ...location,
        telefone: formatPhone(location.telefone),
        criadoEm: formatDate(location.criadoEm, true),
        atualizadoEm: formatDate(location.atualizadoEm, true),
      })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
