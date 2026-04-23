import { GetDemandByIdService } from '../../services/demandas/GetDemandsByIdService.js'

export class GetDemandByIdController {
  async handle(req, res) {
    const { id } = req.params

    const getDemandByIdService = new GetDemandByIdService()

    try {
      const demandDetails = await getDemandByIdService.execute(id)
      return res.status(200).json(demandDetails)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }
}
