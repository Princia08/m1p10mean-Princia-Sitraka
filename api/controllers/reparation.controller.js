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

  getReparationByClient = async (req, res) => {
    try{ res.json(await this.reparationService.getReparationByClient(req.params.idClient)) }
    catch(e) { throw e; }
  }
 
  getReparationByVoiture = async (req, res) => {
    try{ res.json(await this.reparationService.getReparationByVoiture(req.params.idVoiture)) }
    catch(e) { res.status(e.status || 500).json({message: e.message || 'Internal Server Error'})  }
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
  getMontantTotalReparation = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.reparationService.getMontantTotal(id))
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  getSousReparationParReparation = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.reparationService.getAllSousReparation(id))
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

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
