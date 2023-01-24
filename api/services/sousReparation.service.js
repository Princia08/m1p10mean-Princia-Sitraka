const {SousReparation} = require("../models/sousReparation.model");
const {Depot} = require("../models/depot.model");

class SousReparationService {
  create = async (body) => {
    try {
      const sousrep = new SousReparation(body)
      await sousrep.save()
      return sousrep;
    } catch (e) {
      throw e
    }
  }
  update = async (idSousRep) => {
    try {
      const spUpdate = await SousReparation.findOneAndUpdate({_id: idSousRep}, {$set: {status: "fini"}}, {new: true})
      return spUpdate;
    } catch (e) {
      throw e
    }
  }
  getSousReparation = async (idReparation) => {
    try {
      const sousReparation = SousReparation.find({reparation: idReparation}).populate({
        path: 'reparation',
        populate: {path: 'voiture'}
      });
      return sousReparation;
    } catch (e) {
      // console.log(e.message)
      throw e
    }
  }

  deleteSousRep = async (idSp) => {
    try {
      await SousReparation.deleteOne({_id: idSp});
    } catch (e) {
      throw e;
    }
  }
}

module.exports = {SousReparationService}
