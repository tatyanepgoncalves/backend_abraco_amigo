import { UpdateVolunteerService } from '../../services/voluntarios/UpdateVolunteerService.js'

export class UpdateVolunteerController {
  async handle(req, res) {
    const id = req.user_id
    const { nome, email, senha, telefone, endereco } = req.body

    const updateVolunteerService = new UpdateVolunteerService()

    try {
      const volunteer = await updateVolunteerService.execute({
        id,
        nome,
        email,
        senha,
        telefone,
        endereco,
      })

      return res.status(200).json(volunteer)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
