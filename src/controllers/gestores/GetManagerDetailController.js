import { GetManagerDetailService } from '../../services/gestores/GetManagerDetailService.js'

export class GetManagerDetailController {
  async handle(req, res) {
    const id = req.user_id

    const getManagerDetailService = new GetManagerDetailService()

    try {
      const manager = await getManagerDetailService.execute({ id })
      res.status(200).json(manager)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }
}
