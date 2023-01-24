const { async } = require("rxjs");
const {VoitureService} = require("../services/voiture.service")

class VoitureController {
  constructor(voitureService) {
    this.voitureService = voitureService;
  }
  
  create = async (req, res) => {
    try{ res.json(await this.voitureService.create(req.body)) }
    catch(e){ res.status(e.status || 500).json({message: e.message || 'Internal Server Error'}) }
  }

  getVoitures = async (req, res) => {
    try {
      res.json(await this.voitureService.getVoitures())
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  getVoitureByClient = async (req, res) => {
    try {
      res.json(await this.voitureService.getVoitureByClient(req.params.idClient))
    }
    catch(e) {
      throw e;
    }
  }
}

module.exports = {VoitureController}
