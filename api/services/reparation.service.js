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
  getReparation = async (idVoiture) => {
    try {
      const reparation = Reparation.find({voiture:idVoiture}).populate('voiture');
      console.log(reparation);
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }

}

module.exports = {ReparationService}
