class ReparationController {
  constructor(reparationService) {
    this.reparationService = reparationService;
  }

  create = async (req, res) => {
    try {
      console.log(req.body);
      res.json(await this.reparationService.create(req.body))
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  getReparations = async (req, res) => {
    try {
      res.json(await this.reparationService.getReparations())
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

  getReparationByClient = async (req, res) => {
    try{ res.json(await this.reparationService.getReparationByClient(req.params.idClient)) }
    catch(e) { throw e; }
  }

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      await this.reparationService.delete(id);
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {ReparationController}
