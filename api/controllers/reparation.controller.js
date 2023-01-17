class ReparationController {
  constructor(reparationService) {
    this.reparationService = reparationService;
  }

  create = async (req, res) => {
    try {
      res.json(await this.reparationService.create())
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {ReparationController}
