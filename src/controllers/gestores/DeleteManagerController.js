import { DeleteManagerService } from '../../services/gestores/DeleteManagerService.js'

export class DeleteManagerController {
  async handle(req, res) {
    const id = req.user_id

    const deleteManagerService = new DeleteManagerService()

    try {
      const result = await deleteManagerService.execute(id)
      return res.json(result)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }
}
