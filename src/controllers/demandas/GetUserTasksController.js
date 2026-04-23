import { GetUserTasksService } from '../../services/demandas/GetUserTasksService.js'

export class GetUserTasksController {
  async handle(req, res) {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'E-mail é obrigatório.' })
    }

    const getUserTasksService = new GetUserTasksService()

    try {
      const tasks = await getUserTasksService.execute(email)
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
