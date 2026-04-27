import { CreateManagerService } from '../../services/gestores/CreateManagerService.js'

export class CreateManagerController {
  async handle(req, res) {
    const { nome, email, senha } = req.body

    const createManagerService = new CreateManagerService()

    try {
      const user = await createManagerService.execute({
        nome,
        email,
        senha,
      })
      return res.status(201).json(user)
    } catch (error) {
      console.log(error.message)
      return res
        .status(400)
        .json({ error: `Falha ao cadastrar gestor: ${error.message}` })
    }
  }
}
