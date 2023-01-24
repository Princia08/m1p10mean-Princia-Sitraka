const {app} = require('../modules/app/app.module')
const {VoitureService} = require("../services/voiture.service");
const {VoitureController} = require("../controllers/voiture.controller");
const {ReparationService} = require("../services/reparation.service");
const {ReparationController} = require("../controllers/reparation.controller");

function ReparationRouter(base) {

  const service = new ReparationService()
  const controller = new ReparationController(service)

  app.post(`/api/${base}/create`, controller.create)
  app.get(`/api/${base}/reparations`, controller.getReparations);
  app.get(`/api/${base}/rep/:id`, controller.getReparation);
  app.get(`/api/${base}/ut/:id`, controller.updateFinish);
  app.get(`/api/${base}/uf/:id`, controller.updateWaiting);
}

module.exports = {ReparationRouter}
