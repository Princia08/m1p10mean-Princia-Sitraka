const {Reparation} = require("../models/reparation.model");

class ReparationService {

  create = async (voiture) => {
    try {
      console.log(voiture);
      const reparation = new Reparation({voiture: voiture});
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
      throw e
    }
  }

}

module.exports = {ReparationService}
