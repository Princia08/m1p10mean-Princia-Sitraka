const { async } = require("rxjs");
const {Reparation} = require("../models/reparation.model");

class ReparationService {

  create = async (body) => {
    try {
      const reparation = new Reparation(body);
      await reparation.save();
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  getReparations = async () => {
    try {
      const reparation = Reparation.find().populate('voiture');
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  getReparation = async (idRep) => {
    try {
      const reparation = Reparation.findOne({_id:idRep}).populate('voiture');
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e;
    }
  }

  getReparationByClient = async(idClient) => {
    try {
      const reparation = await Reparation.find().populate({path:'voiture', match:{idClient:idClient}});
      return reparation;
    }
    catch(e) {
      throw e;
    }
  }

}

module.exports = {ReparationService}
