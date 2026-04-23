import { UpdateDemandService } from '../../services/demandas/UpdateDemandService.js'

export class UpdateDemandController {
  async handle(req, res) {
    const { id } = req.params
    const userId = req.user_id
    const { titulo, descricao, prioridade, voluntariosNecessarios } = req.body

    const updateDemandService = new UpdateDemandService()

    try {
      const demand = await updateDemandService.execute({
        demandId: id,
        userId,
        data: { titulo, descricao, prioridade, voluntariosNecessarios },
      })

      return res.status(200).json(demand)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
