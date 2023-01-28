class DepenseController {
  constructor(depenseService) {
    this.depenseService = depenseService;
  }

  create = async (req, res) => {
    try {
      res.json(await this.depenseService.create(req.body))
    } catch (e) {
      console.log(e.message);
      res.status(e.status || 500).json({message: e.message || 'Internal Server Error'})
    }
  }

  getDepenses = async (req, res) => {
    try {
      res.json(await this.depenseService.getDepenses())
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  getTotalDepensesMois = async (req, res) => {
    try {
      res.json(await this.depenseService.getTotalMois())
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

}

module.exports = {DepenseController}
