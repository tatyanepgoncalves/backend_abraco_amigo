import { AuthUserService } from '../../services/usuarios/AuthUserService.js'

export class AuthUserController {
  async handle(req, res) {
    const { email, senha } = req.body

    const authUserService = new AuthUserService()

    try {
      const auth = await authUserService.execute({ email, senha })

      return res.status(200).json(auth)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
