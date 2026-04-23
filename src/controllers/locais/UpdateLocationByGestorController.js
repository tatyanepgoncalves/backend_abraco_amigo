import { UpdateLocationByGestorService } from '../../services/locais/updateLocationByGestorService.js'

export class UpdateLocationByGestorController {
  async handle(req, res) {
    const { id, nome, endereco, email, telefone } = req.body
    const userId = req.user_id

    const updateLocationService = new UpdateLocationByGestorService()

    try {
      const updateLocation = await updateLocationService.execute({
        id,
        nome,
        endereco,
        email,
        telefone,
        userId,
      })
      return res.json(updateLocation)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
