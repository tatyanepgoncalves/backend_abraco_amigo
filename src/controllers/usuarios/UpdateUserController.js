import { UpdateUserService } from '../../services/usuarios/UpdateUserService.js'

export class UpdateUserController {
  async handle(req, res) {
    const id = req.user_id
    const { nome, email, senha, telefone, endereco, image } = req.body

    const updateUserService = new UpdateUserService()

    try {
      const user = await updateUserService.execute({
        id,
        nome,
        email,
        senha,
        telefone,
        endereco,
        image,
      })

      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
