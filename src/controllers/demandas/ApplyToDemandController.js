import { ApplyToDemandService } from '../../services/demandas/ApplyToDemandService.js'

export class ApplyToDemandController {
  async handle(req, res) {
    const { id: demandaId } = req.params
    const { nome, email, telefone, endereco } = req.body

    const applyToDemandService = new ApplyToDemandService()

    try {
      const result = await applyToDemandService.execute({
        demandaId,
        dadosVoluntario: { nome, email, telefone, endereco },
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
