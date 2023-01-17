const {VoitureService} = require("../services/voiture.service")

class VoitureController {
  constructor(voitureService) {
    this.voitureService = voitureService;
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