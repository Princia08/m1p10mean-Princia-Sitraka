const {async} = require("rxjs");

class FactureController {
  constructor(factureService) {
    this.factureService = factureService;
  }

  create = async (req, res) => {
    try {
      res.json(await this.factureService.create(req.body))
    } catch (e) {
      res.status(e.status || 500).json({message: e.message || 'Internal Server Error'})
    }
  }

  getFactureByIdClient = async (req, res) => {
    try {
      res.json(await this.factureService.getFactureByIdClient(req.params.idClient))
    } catch (e) {
      throw e
    }
  }
  getMontantTotalFacture = async (req, res) => {
    try {
      res.json(await this.factureService.getMontantTotalParFacture(req.params.idFacture))
    } catch (e) {
      throw e
    }
  }
  getChiffreAffaire = async (req, res) => {
    try {
      res.json(await this.factureService.getCA())
    } catch (e) {
      throw e
    }
  }
  generatePdfFacture = async (req, res) => {
    try {
      res.json(await this.factureService.generatePdf(req.params.id))
    } catch (e) {
      res.status(e.status || 500).json({message: e.message || 'Internal Server Error'})
    }
  }
}


module.exports = {FactureController}
