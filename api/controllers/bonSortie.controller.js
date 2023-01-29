class BonSortieController {
  constructor(bonSortieService) {
    this.bonSortieService = bonSortieService;

  }

  create = async (req, res) => {
    try {
      res.json(await this.bonSortieService.create(req.body))
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  update = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.bonSortieService.update(id));
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  getBonSortie = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.bonSortieService.getBonSortie(id));
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  getPdf = async (req, res) => {
    try {
      const id = req.params.id;
      req.body.reparation = id;
      const bonSortieParReparation = await this.bonSortieService.getBonSortie(id);
      if (bonSortieParReparation == null) {
        await this.bonSortieService.create(req.body);
      }
      res.json(await this.bonSortieService.generatePdf(id));
    } catch (e) {
      console.log(e.message);
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  getListeSousRep = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.bonSortieService.getListeSousReparation(id));
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {BonSortieController}
