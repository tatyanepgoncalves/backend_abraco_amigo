import { UpdateCategoriaService } from '../../services/categorias/UpdateCategoriaService.js'

export class UpdateCategoriaController {
  async handle(req, res) {
    const { id } = req.params
    const { nome } = req.body

    if (!nome || nome.trim() === '') {
      return res
        .status(400)
        .json({ error: 'O novo nome da categoria é obrigatório.' })
    }

    const updateCategoriaService = new UpdateCategoriaService()

    try {
      const categoria = await updateCategoriaService.execute({ id, nome })

      return res.status(200).json(categoria)
    } catch (error) {
      console.error(error.message)
      // Se for erro de "não encontrado" enviamos 404, caso contrário 400
      const statusCode =
        error.message === 'Categoria não encontrada.' ? 404 : 400
      return res.status(statusCode).json({ error: error.message })
    }
  }
}
