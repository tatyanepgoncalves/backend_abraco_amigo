import { GetDemandsService } from '../../services/demandas/GetDemandsService.js'

export class GetDemandsController {
  async handle(req, res) {
    const getDemandsService = new GetDemandsService()
    const { titulo, categoriaId, status, prioridade } = req.query

    try {
      const allDemands = await getDemandsService.execute({
        titulo,
        categoriaId,
        status,
        prioridade,
      })
      return res.status(200).json(allDemands)
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: 'Erro ao listar ' })
    }
  }
}
