const {app} = require('../modules/app/app.module')
const {DepotService} = require("../services/depot.service");
const {DepotController} = require("../controllers/depot.controller");
const {BonSortieService} = require("../services/bonSortie.service");
const {BonSortieController} = require("../controllers/bonSortie.controller");

function BonSortieRouter(base) {

  const service = new BonSortieService()
  const controller = new BonSortieController(service)

  app.post(`/api/${base}/create`, controller.create)
  app.get(`/api/${base}/bs/:id`, controller.getBonSortie);
  app.get(`/api/${base}/bsPdf/:id`, controller.getPdf);
}

module.exports = {BonSortieRouter}
