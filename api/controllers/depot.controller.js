class DepotController {
  constructor(depotService) {
    this.depotService = depotService;
  }

  create = async (req, res) => {
    try {
      res.json(await this.depotService.create())
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {DepotController}
