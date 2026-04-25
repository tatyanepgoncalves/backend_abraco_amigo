import { DeleteVolunteerService } from '../../services/voluntarios/DeleteVolunteerService.js'

export class DeleteVolunteerController {
  async handle(req, res) {
    const id = req.user_id

    const deleteVolunteerService = new DeleteVolunteerService()

    try {
      const result = await deleteVolunteerService.execute(id)
      return res.json(result)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }
}
