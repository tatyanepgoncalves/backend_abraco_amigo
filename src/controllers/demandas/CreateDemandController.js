import { CreateDemandService } from '../../services/demandas/CreateDemandService.js'

export class CreateDemandController {
  async handle(req, res) {
    const {
      titulo,
      descricao,
      prioridade,
      locationId,
      voluntariosNecessarios,
      categoriaId,
    } = req.body
    const userId = req.user_id

    if (!categoriaId) {
      return res
        .status(400)
        .json({ error: 'O campo categoriaId é obrigatório.' })
    }

    const createDemandService = new CreateDemandService()

    try {
      const demand = await createDemandService.execute({
        titulo,
        descricao,
        prioridade: prioridade ? prioridade.toUpperCase() : 'BAIXA',
        locationId,
        categoriaId,
        voluntariosNecessarios: Number(voluntariosNecessarios),
        userId,
      })

      return res.status(201).json(demand)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
