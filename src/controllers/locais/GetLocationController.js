import { GetLocationService } from '../../services/locais/getLocationService.js'

export class GetLocationController {
  async handle(_, res) {
    const getLocationService = new GetLocationService()

    try {
      const locations = await getLocationService.execute()

      return res.status(200).json(locations)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar locais' })
    }
  }
}
