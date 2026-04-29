import { GetCategoriaService } from '../../services/categorias/GetCategoriaService.js'

export class GetCategoriaController {
  async handle(req, res) {
    const { nome } = req.query

    const getCategoriaService = new GetCategoriaService()

    try {
      const categorias = await getCategoriaService.execute({ nome })

      return res.status(200).json(categorias)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Erro ao listar categorias.' })
    }
  }
}
