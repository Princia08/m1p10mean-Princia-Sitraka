const { async } = require("rxjs");
const {Reparation} = require("../models/reparation.model");
const {SousReparation} = require("../models/sousReparation.model");
const mongoose = require("mongoose");

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
  updateFinish = async (idReparation) => {
    try {
      const repUpdate = await Reparation.findOneAndUpdate({_id: idReparation}, {$set: {avancement: "terminée"}}, {new: true})
      return repUpdate;
    } catch (e) {
      throw e
    }
  }
  updateNoFinish = async (idReparation) => {
    try {
      const repUpdate = await Reparation.findOneAndUpdate({_id: idReparation}, {$set: {avancement: "en cours"}}, {new: true})
      return repUpdate;
    } catch (e) {
      throw e
    }
  }
  updateDateSortie = async (idReparation) => {
    try {
      const repUpdate = await Reparation.findOneAndUpdate({_id: idReparation}, {$set: {date_sortie: new Date().toISOString()}}, {new: true})
      return repUpdate;
    } catch (e) {
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
      const reparation = Reparation.findOne({_id: idRep}).populate({
        path: 'voiture',
        populate: {path: 'idClient'}
      });
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
  getAllSousReparation = async (idReparation) => {
    try {
      const reparation = await Reparation.aggregate([
        {
          $match: {_id: mongoose.Types.ObjectId(idReparation)}
        },
        {
          $lookup: {
            from: "sousReparations",
            localField: "_id",
            foreignField: "reparation",
            as: "sousReparations"
          }
        },
        {
          $project: {
            "sousReparations.motif": 1,
            "sousReparations.montant": 1
          }
        }
      ]);
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  getTempsdeReparationMoyenne = async () => {
    try {
      const tempsMoyenne = await Reparation.aggregate([
        {
          $match: {
            date_sortie: {$ne: null}
          }
        },
        {
          $group: {
            _id: null,
            tempsMoyenne: {
              $avg: {
                $subtract: [
                  "$date_sortie",
                  "$date_entree"
                ]
              }
            }
          }
        }
      ]);
      let tempsMoyenneHeure = Math.round(tempsMoyenne[0].tempsMoyenne / (1000 * 60 * 60));
      return tempsMoyenneHeure;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {ReparationService}
