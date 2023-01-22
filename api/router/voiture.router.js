const {app} = require('../modules/app/app.module')
const {VoitureService} = require("../services/voiture.service");
const {VoitureController} = require("../controllers/voiture.controller");

function VoitureRouter(base) {

  const service = new VoitureService()
  const controller = new VoitureController(service)

  app.post(`/api/${base}/create`, controller.create)
  app.get(`/api/${base}/voitures`, controller.getVoitures)
}

module.exports = {VoitureRouter}
