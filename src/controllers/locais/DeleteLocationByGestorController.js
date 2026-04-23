import { DeleteLocationByGestorService } from '../../services/locais/DeleteLocationByGestorService.js'

export class DeleteLocationByGestorController {
  async handle(req, res) {
    const { id } = req.params
    const userId = req.user_id

    const deleteLocationService = new DeleteLocationByGestorService()

    try {
      const result = await deleteLocationService.execute({
        locationId: id,
        userId,
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
