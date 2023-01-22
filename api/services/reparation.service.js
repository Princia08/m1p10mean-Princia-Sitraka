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
      const reparation = Reparation.find().populate({
        path: 'voiture',
        populate: {path: 'idClient'}
      });
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  getReparation = async (idRep) => {
    try {
      const reparation = Reparation.findOne({_id:idRep}).populate({
        path: 'voiture',
        populate: {path: 'idClient'}
      });
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }

}

module.exports = {ReparationService}
