import { GetLocationByIdService } from '../../services/locais/GetLocationByIdService.js'

export class GetLocationByIdController {
  async handle(req, res) {
    const { id } = req.params
    const getLocationByIdService = new GetLocationByIdService()

    try {
      const locationDetails = await getLocationByIdService.execute(id)
      return res.status(200).json(locationDetails)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }
}
