import { AuthVolunteerService } from '../../services/voluntarios/AuthVolunteerService.js'

export class AuthVolunteerController {
  async handle(req, res) {
    const { email, senha } = req.body

    const authVolunteerService = new AuthVolunteerService()

    try {
      const auth = await authVolunteerService.execute({ email, senha })

      return res.status(200).json(auth)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
