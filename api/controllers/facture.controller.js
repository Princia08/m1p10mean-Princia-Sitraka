class FactureController {
  constructor(factureService) {
    this.factureService = factureService;
  }
  
  create = async (req, res) => {
    try{ res.json(await this.factureService.create(req.body)) }
    catch(e){
      res.status(e.status || 500).json({message: e.message || 'Internal Server Error'}) }
  }

  getFactureByIdClient = async (req, res) => {
    try {
      res.json(await this.factureService.getFactureByIdClient(req.params.idClient))
    } catch (e) { throw e }
  }

  generatePdfFacture = async (req, res) => {
    try {
      res.json(await this.factureService.generatePdf("45"))
    } catch (e) {
      throw e;
    }
  }
}

module.exports = {FactureController}
