import { DeleteCategoriaService } from '../../services/categorias/DeleteCategoriaService.js'

export class DeleteCategoriaController {
  async handle(req, res) {
    const { id } = req.params

    const deleteCategoriaService = new DeleteCategoriaService()

    try {
      const result = await deleteCategoriaService.execute(id)

      return res.status(200).json(result)
    } catch (error) {
      console.error(error.message)

      const statusCode = error.message.includes('não encontrada') ? 404 : 400
      return res.status(statusCode).json({ error: error.message })
    }
  }
}
