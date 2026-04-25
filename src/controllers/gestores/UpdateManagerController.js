import { UpdateManagerService } from '../../services/gestores/UpdateManagerService.js'

export class UpdateManagerController {
  async handle(req, res) {
    const id = req.user_id
    const { nome, email, senha, telefone, endereco } = req.body

    const updateManagerService = new UpdateManagerService()

    try {
      const manager = await updateManagerService.execute({
        id,
        nome,
        email,
        senha,
        telefone,
        endereco,
      })

      return res.status(200).json(manager)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
