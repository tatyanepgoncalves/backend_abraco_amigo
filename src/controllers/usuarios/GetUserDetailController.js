import { GetUserDetailService } from '../../services/usuarios/GetUserDetailService.js'

export class GetUserDetailController {
  async handle(req, res) {
    const id = req.user_id

    const getUserDetailService = new GetUserDetailService()

    try {
      const user = await getUserDetailService.execute({ id })
      res.status(200).json(user)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }
}
