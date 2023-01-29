const {Facture} = require("../models/facture.model");

class FactureService {

  create = async (body) => {
    try {
      const facture = new Facture(body);
      await facture.save();
      return facture;
    } catch (e) {
      throw e
    }
  }
  
  getFactureByIdClient = async (idClient) => {
    try {
      const facture = await Facture.find({idClient:idClient}).populate({path:'idReparation', populate: {path:'voiture'}});
      return facture;
    }
    catch(e) {
      throw e;
    }
  }
}

module.exports = {FactureService}
