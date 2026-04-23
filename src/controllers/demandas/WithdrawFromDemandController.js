import { WithdrawFromDemandService } from '../../services/demandas/WithdrawFromDemandService.js'

export class WithdrawFromDemandController {
  async handle(req, res) {
    const { id: demandId } = req.params
    const { email } = req.body

    const withdrawService = new WithdrawFromDemandService()

    try {
      const result = await withdrawService.execute({
        demandId,
        email,
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
