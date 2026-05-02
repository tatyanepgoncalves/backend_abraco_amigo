import { GetUserTasksService } from '../../services/demandas/GetUserTasksService.js'

export class GetUserTasksController {
  async handle(req, res) {
    const id = req.user_id

    const getUserTasksService = new GetUserTasksService()

    try {
      const tasks = await getUserTasksService.execute(id)
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
