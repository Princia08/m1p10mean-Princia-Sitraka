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
  updateFinish = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.reparationService.updateFinish(id));
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  updateWaiting = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.reparationService.updateNoFinish(id));
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  updateDateSortie = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.reparationService.updateDateSortie(id));
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
  delete = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.reparationService.delete(id));
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  // getMontant = async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     res.json(await this.reparationService.getSommeMontant(id))
  //   } catch (e) {
  //     console.log(e.message)
  //     res.status(500).json({message: 'Internal Server Error'})
  //   }
  // }
  getTempsMoyenne = async (req, res) => {
    try {
      res.json(await this.reparationService.getTempsdeReparationMoyenne())
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {ReparationController}
