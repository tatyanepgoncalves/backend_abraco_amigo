import { CreateVolunteerService } from '../../services/voluntarios/CreateVolunteerService.js'

export class CreateVolunteerController {
  async handle(req, res) {
    const { nome, email, senha } = req.body

    const createVolunteerService = new CreateVolunteerService()

    try {
      const user = await createVolunteerService.execute({
        nome,
        email,
        senha,
      })
      return res.status(201).json(user)
    } catch (error) {
      console.log(error.message)
      return res
        .status(400)
        .json({ error: `Falha ao cadastrar voluntário: ${error.message}` })
    }
  }
}
