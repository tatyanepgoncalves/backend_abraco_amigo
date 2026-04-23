import { GetDemandsService } from '../../services/demandas/GetDemandsService.js'

export class GetDemandsController {
  async handle(req, res) {
    const getDemandsService = new GetDemandsService()
    const { titulo, status, prioridade, orderBy } = req.query

    try {
      const allDemands = await getDemandsService.execute({
        titulo,
        status,
        prioridade,
        orderBy,
      })
      return res.status(200).json(allDemands)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
