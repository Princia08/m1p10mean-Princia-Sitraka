const {app} = require('../modules/app/app.module')
const {DepotService} = require("../services/depot.service");
const {DepotController} = require("../controllers/depot.controller");

function DepotRouter(base) {

  const service = new DepotService()
  const controller = new DepotController(service)

  app.post(`/api/${base}/create`, controller.create)
  app.get(`/api/${base}/depots`, controller.getVoitures);
  app.get(`/api/${base}/update/:id`, controller.updateDepot);
}

module.exports = {DepotRouter}
