import { LogoutUserService } from '../../services/usuarios/LogoutUserService.js'

export class LogoutUserController {
  async handle(req, res) {
    const id = req.user_id

    const logoutUserService = new LogoutUserService()

    try {
      await logoutUserService.execute(id)

      return res.status(200).json({ message: 'Logout realizado com sucesso' })
    } catch {
      return res.status(400).json({ error: 'Erro interno ao processar logout' })
    }
  }
}
