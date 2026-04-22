import { CreateUserService } from '../../services/usuarios/CreateUserService.js'

export class CreateUserController {
  async handle(req, res) {
    const { nome, email, senha, userTipo } = req.body

    const createUserService = new CreateUserService()

    try {
      const user = await createUserService.execute({
        nome,
        email,
        senha,
        userTipo,
      })
      return res.status(201).json(user)
    } catch (error) {
      console.log(error.message)
      return res
        .status(400)
        .json({ error: `Falha ao criar usuário: ${error.message}` })
    }
  }
}
