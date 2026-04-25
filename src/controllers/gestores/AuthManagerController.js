import { AuthManagerService } from '../../services/gestores/AuthManagerService.js'

export class AuthManagerController {
  async handle(req, res) {
    const { email, senha } = req.body

    const authManagerService = new AuthManagerService()

    try {
      const auth = await authManagerService.execute({ email, senha })

      return res.status(200).json(auth)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
