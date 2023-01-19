const url = require("url");

class DepotController {
  constructor(depotService) {
    this.depotService = depotService;
  }
  create = async (req, res) => {
    try{ res.json(await this.depotService.create(req.body)) }
    catch(e){
      console.log(e.message);
      res.status(e.status || 500).json({message: e.message || 'Internal Server Error'}) }
  }

  getVoitures = async (req, res) => {
    try {
      res.json(await this.depotService.getDepots())
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  updateDepot = async (req, res) => {
    try {
      const id = req.params.id;
      const depot = await this.depotService.update(id);

    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

}

module.exports = {DepotController}
