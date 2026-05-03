import { WithdrawFromDemandService } from '../../services/demandas/WithdrawFromDemandService.js'

export class WithdrawFromDemandController {
  async handle(req, res) {
    const { demandaId } = req.body
    const userId = req.user_id

    const withdrawService = new WithdrawFromDemandService()

    try {
      const result = await withdrawService.execute({
        demandaId,
        userId,
      })

      return res.status(200).json({
        message: 'Você desistiu da ação com sucesso.',
        demand: result,
      })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
