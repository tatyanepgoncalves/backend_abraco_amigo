import { GetVolunteerDetailService } from '../../services/voluntarios/GetVolunteerDetailService.js'

export class GetVolunteerDetailController {
  async handle(req, res) {
    const id = req.user_id

    const getVolunteerDetailService = new GetVolunteerDetailService()

    try {
      const volunteer = await getVolunteerDetailService.execute({ id })
      res.status(200).json(volunteer)
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }
}
