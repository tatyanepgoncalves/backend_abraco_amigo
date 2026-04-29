import { formatDate, formatPhone } from '../../lib/utils.js'
import { CreateLocationService } from '../../services/locais/CreateLocationService.js'

export class CreateLocationController {
  async handle(req, res) {
    const { nome, endereco, telefone, email, tipoLocal } = req.body

    const gestorId = req.user_id

    const createLocationService = new CreateLocationService()

    try {
      const location = await createLocationService.execute({
        nome,
        endereco,
        telefone,
        email,
        tipoLocal,
        gestorId,
      })
      return res.status(201).json({
        ...location,
        telefone: formatPhone(location.telefone),
        criadoEm: formatDate(location.criadoEm, true),
        atualizadoEm: formatDate(location.atualizadoEm, true),
      })
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ error: error.message })
    }
  }
}
