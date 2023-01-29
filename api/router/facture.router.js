const {FactureController} = require('../controllers/facture.controller')
const {FactureService} = require('../services/facture.service')
const {app} = require('../modules/app/app.module')

function FactureRouter(base) {
  const service = new FactureService();
  const controller = new FactureController(service)

  app.post(`/api/${base}`, controller.create);
  app.get(`/api/${base}/idClient/:idClient`, controller.getFactureByIdClient);
  app.get(`/api/${base}/pdf/:id`, controller.generatePdfFacture);
}

module.exports = {FactureRouter}
