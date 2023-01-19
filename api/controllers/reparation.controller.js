class ReparationController {
  constructor(reparationService) {
    this.reparationService = reparationService;
  }

  create = async (req, res) => {
    try {
      res.json(await this.reparationService.create(req.body))
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  getReparation = async (req, res) => {
    try {
      const id = req.params.id;

      res.json(await this.reparationService.getReparation(id))
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {ReparationController}
