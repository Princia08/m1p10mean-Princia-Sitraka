const {VoitureService} = require("../services/voiture.service")

class VoitureController {
  constructor(voitureService) {
    this.voitureService = voitureService;
  }

  create = async (req, res) => {
    try {
      res.json(await this.voitureService.create(req.body))
    } catch (e) {
      console.log(e.message)
      res.status(e.status || 500).json({message: e.message || 'Internal Server Error'})
    }
  }
  getVoitures = async (req, res) => {
    try {
      res.json(await this.voitureService.getVoitures())
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {VoitureController}
