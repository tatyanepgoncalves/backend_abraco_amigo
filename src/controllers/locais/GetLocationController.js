import { z } from 'zod'
import { getLocationSchema } from '../../schema/locais/getLocationSchema.js'
import { GetLocationService } from '../../services/locais/GetLocationService.js'

export class GetLocationController {
  async handle(req, res) {
    try {
      const query = getLocationSchema.parse(req.query)
      const getLocationService = new GetLocationService()
      const locations = await getLocationService.execute(query)
      return res.status(200).json(locations)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: 'Dados de busca inválidos', details: error.errors })
      }
      return res.status(500).json({ error: 'Erro ao buscar locais' })
    }
  }
}
