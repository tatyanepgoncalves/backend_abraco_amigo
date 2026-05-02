import { ApplyToDemandService } from '../../services/demandas/ApplyToDemandService.js'

export class ApplyToDemandController {
  async handle(req, res) {
    const { demandaId } = req.body
    const userId = req.user_id

    const applyToDemandService = new ApplyToDemandService()

    try {
      const result = await applyToDemandService.execute({
        demandaId,
        userId,
      })

      return res.status(201).json({
        message: 'Candidatura realizada com sucesso!',
        demand: result,
      })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
