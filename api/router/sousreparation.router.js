const {app} = require('../modules/app/app.module')
const {SousReparationService} = require("../services/sousReparation.service");
const {SousReparationController} = require("../controllers/sousreparation.controller");
function SousReparationRouter(base) {

  const service = new SousReparationService()
  const controller = new SousReparationController(service)

  app.post(`/api/${base}/create`, controller.create)
  app.get(`/api/${base}/d/:id`, controller.delete)
  // app.get(`/api/${base}/voitures`, controller.getVoitures)
  app.get(`/api/${base}/sp/:id`, controller.getSousreparation);
  app.get(`/api/${base}/u/:id`, controller.update);
  app.get(`/api/${base}/sum/:id`, controller.getMontant);
}

module.exports = {SousReparationRouter}
