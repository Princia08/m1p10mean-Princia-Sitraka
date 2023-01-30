const {async} = require("rxjs");
const {Reparation} = require("../models/reparation.model");
const {SousReparation} = require("../models/sousReparation.model");
const {SousReparationService} = require('../services/sousReparation.service')
const mongoose = require("mongoose");

class ReparationService {
  constructor() {
    this.sousReparationService = new SousReparationService();
  }
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

  getReparationByClient = async (idClient) => {
    try {
      const reparation = await Reparation.find({idClient: idClient, avancement: "en cours"}).populate({path: 'voiture'});
      return reparation;
    } catch (e) {
      throw e;
    }
  }

  getReparationByVoiture = async (idVoiture) => {
    try {
      const reparationList = await Reparation.find({idVoiture: idVoiture, avancement: "terminée"}).populate({path: 'voiture'});
      
      let montantList = [];
      for (let reparation of reparationList) {
        montantList.push((await this.sousReparationService.getMontantTotal(reparation._id))[0].totalMontant);
      }
      let result = [];
      result = [reparationList, montantList];
      return result;
    } catch (e) {
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
        // {
        //   $project: {
        //     "sousReparations.motif": 1,
        //     "sousReparations.montant": 1
        //   }
        // }
      ]);
      return reparation[0];
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
      let tempsMoyenneHeure = (tempsMoyenne.length!=0) ? Math.round(tempsMoyenne[0].tempsMoyenne / (1000 * 60 * 60)) : 0;
      return tempsMoyenneHeure;
    } catch (e) {
     throw e;
    }
  }

  getMontantTotal = async (idReparation) => {
    try {
      console.log(idReparation);
      const list = await Reparation.aggregate([
        {
          $match: {_id: mongoose.Types.ObjectId("63cd9f9f7159a7cb0207e725")}
        },
        {
          $lookup: {
            from: "sousreparations",
            localField: "_id",
            foreignField: "reparation",
            as: "sousReparations"
          }
        },
        {
          $project: {
            total: {$sum: '$sousReparations.montant'}
          }
        }
      ]);
      return list;
    } catch (e) {
      console.log(e.message);
    }
  }

}

module.exports = {ReparationService}
