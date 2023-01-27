const {app} = require('../modules/app/app.module')
const {DepotService} = require("../services/depot.service");
const {DepotController} = require("../controllers/depot.controller");
const {DepenseService} = require("../services/depense.service");
const {DepenseController} = require("../controllers/depense.controller");

function DepenseRouter(base) {

  const service = new DepenseService()
  const controller = new DepenseController(service)

  app.post(`/api/${base}/create`, controller.create)
  app.get(`/api/${base}/depenses`, controller.getDepenses);
  app.get(`/api/${base}/totalDep`, controller.getTotalDepensesMois);
}

module.exports = {DepenseRouter}
