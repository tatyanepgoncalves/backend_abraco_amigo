import { CreateCategoriaService } from '../../services/categorias/CreateCategoriaService.js'

export class CreateCategoriaController {
  async handle(req, res) {
    const { nome } = req.body

    if (!nome || nome.trim() === '') {
      return res
        .status(400)
        .json({ error: 'O nome da categoria é obrigatório.' })
    }

    const createCategoriaService = new CreateCategoriaService()

    try {
      const categoria = await createCategoriaService.execute({ nome })

      return res.status(201).json(categoria)
    } catch (error) {
      console.error(error.message)
      return res.status(400).json({ error: error.message })
    }
  }
}
