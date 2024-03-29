const {FactureController} = require('../controllers/facture.controller')
const {FactureService} = require('../services/facture.service')
const {app} = require('../modules/app/app.module')

function FactureRouter(base) {
  const service = new FactureService();
  const controller = new FactureController(service)

  app.post(`/api/${base}`, controller.create);
  app.get(`/api/${base}/idClient/:idClient`, controller.getFactureByIdClient);
  app.get(`/api/${base}/montantFacture/:idFacture`, controller.getMontantTotalFacture);
  app.post(`/api/${base}/chiffreAffaire`, controller.getChiffreAffaire);
  app.get(`/api/${base}/pdf/:id`, controller.generatePdfFacture);
  app.get(`/api/${base}/unpaid`, controller.getFactureUnpaid);
  app.get(`/api/${base}/update/:idFacture`, controller.updateEtatPaiement);
  app.get(`/api/${base}/chiffreAffaireMois/:mois`, controller.getChiffreAffaireParMois);
  app.get(`/api/${base}/beneficeMois/:mois`, controller.getBeneficeMois);
}

module.exports = {FactureRouter}
