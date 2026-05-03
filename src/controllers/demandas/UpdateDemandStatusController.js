import { UpdateDemandStatusService } from '../../services/demandas/UpdateDemandStatusService.js'

export class UpdateDemandStatusController {
  async handle(req, res) {
    const { demandaId, status } = req.body
    const userId = req.user_id

    if (!status) {
      return res
        .status(400)
        .json({ error: 'O novo status deve ser informado.' })
    }

    const updateDemandStatusService = new UpdateDemandStatusService()

    try {
      const updated = await updateDemandStatusService.execute({
        demandaId,
        status,
        userId,
      })

      return res.status(200).json(updated)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
