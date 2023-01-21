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
  updateDepot = async (req, res) => {
    try {
      const id = req.params.id;
      await this.bonSortieService.update(id);
    } catch (e) {
      console.log(e.message)
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  getBonSortie = async (req, res) => {
    try {
      const id = req.params.id;
      res.json(await this.bonSortieService.getBonSortie(id))
    } catch (e) {
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
  getPdf = async (req, res) => {
    try {
      const id = req.params.id;
      // const bonSortie = await this.bonSortieService.getBonSortie(id);
      // console.log(bonSortie);
      await this.bonSortieService.getBonDeSortiePDF(id);

    } catch (e) {
      console.log(e.message);
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = {BonSortieController}
