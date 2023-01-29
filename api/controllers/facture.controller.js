class FactureController {
  constructor(factureService) {
    this.factureService = factureService;
  }
  
  create = async (req, res) => {
    try{ res.json(await this.factureService.create(req.body)) }
    catch(e){
      res.status(e.status || 500).json({message: e.message || 'Internal Server Error'}) }
  }
}

module.exports = {FactureController}
