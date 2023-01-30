const {async} = require("rxjs");

class FactureController {
  constructor(factureService) {
    this.factureService = factureService;
  }

  create = async (req, res) => {
    try { res.json(await this.factureService.create(req.body)) }
    catch (e) {
      res.status(e.status || 500).json({ message: e.message || 'Internal Server Error' })
    }
  }

  getFactureByIdClient = async (req, res) => {
    try {
      res.json(await this.factureService.getFactureByIdClient(req.params.idClient))
    } catch (e) {
      res.status(e.status || 500).json({ message: e.message || 'Internal Server Error' })
     }
  }

  getFactureUnpaid = async (req, res) => {
    try {
      res.json(await this.factureService.getFactureUnpaid())
    } catch (e) {
      res.status(e.status || 500).json({ message: e.message || 'Internal Server Error' })
     }
  }

  updateEtatPaiement = async (req, res) => {
    try {
      res.json(await this.factureService.updateEtatPaiement(req.params.idFacture))
    } catch (e) {
      res.status(e.status || 500).json({ message: e.message || 'Internal Server Error' })
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
      // req.body.date1
      res.json(await this.factureService.getCA(req.body.date1,req.body.date2))
    } catch (e) {
      throw e
    }
  }
  getChiffreAffaireParMois = async (req, res) => {
    try {
      const mois = req.params.mois;
      res.json(await this.factureService.getCAMois(mois))
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

module.exports = { FactureController }
