import { CreateDemandService } from '../../services/demandas/CreateDemandService.js'

export class CreateDemandController {
  async handle(req, res) {
    const {
      titulo,
      descricao,
      prioridade,
      locationId,
      voluntariosNecessarios,
    } = req.body
    const userId = req.user_id

    const createDemandService = new CreateDemandService()

    try {
      const demand = await createDemandService.execute({
        titulo,
        descricao,
        prioridade: prioridade.toUpperCase(),
        locationId,
        voluntariosNecessarios: Number(voluntariosNecessarios),
        userId,
        criadoEm: new Date(),
      })

      return res.status(201).json(demand)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
