import { DeleteDemandService } from '../../services/demandas/DeleteDemandService.js'

export class DeleteDemandController {
  async handle(req, res) {
    const { demandaId } = req.body
    const userId = req.user_id

    const deleteDemandService = new DeleteDemandService()

    try {
      const result = await deleteDemandService.execute({
        demandaId,
        userId,
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
