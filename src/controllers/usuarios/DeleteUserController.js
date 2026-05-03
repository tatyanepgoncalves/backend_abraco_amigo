import { DeleteUserService } from '../../services/usuarios/DeleteUserService.js'

export class DeleteUserController {
  async handle(req, res) {
    const id = req.user_id

    const deleteUserService = new DeleteUserService()

    try {
      const result = await deleteUserService.execute(id)
      return res.json(result)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }
}
