class SousReparationController {
  constructor(sousReparationService) {
    this.sousReparationService = sousReparationService;
  }

  create = async (req, res) => {
    try {
      res.json(await this.sousReparationService.create(req.body))
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  update = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.sousReparationService.update(id));
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.sousReparationService.deleteSousRep(id));
    } catch (e) {
      // console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  getSousreparation = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.sousReparationService.getSousReparation(id));
    } catch (e) {
      // console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  getMontant = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.sousReparationService.getMontant(id));
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {SousReparationController}
