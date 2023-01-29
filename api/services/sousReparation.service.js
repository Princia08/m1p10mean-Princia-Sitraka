const {SousReparation} = require("../models/sousReparation.model");
const mongoose = require("mongoose");

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
      const spUpdate = await SousReparation.findOneAndUpdate({_id: idSousRep}, {$set: {status: "terminée"}}, {new: true})
      return spUpdate;
    } catch (e) {
      throw e
    }
  }
  getSousReparation = async (idReparation) => {
    try {
      const sousReparation = await SousReparation.find({reparation: idReparation}).populate({
        path: 'reparation',
        populate: {path: 'voiture'}
      });
      return sousReparation;
    } catch (e) {
      throw e
    }
  }

  getMontantTotal = async (idReparation) => {
    try {
      const list = await SousReparation.aggregate([
        {$match: {reparation: mongoose.Types.ObjectId(idReparation)}},
        {
          $group: {
            _id: "$reparation",
            totalMontant: {$sum: "$montant"}
          }
        }]);
      return list;
    } catch (e) {
      throw e;
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
