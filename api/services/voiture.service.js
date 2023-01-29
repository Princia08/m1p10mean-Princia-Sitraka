const {Voiture} = require("../models/voiture.model");
const {Depot} = require("../models/depot.model");
const e = require("express");
const mongoose = require("mongoose");

class VoitureService {
  create = async (body) => {
    try {
      const voiture = new Voiture(body)
      await voiture.save()
      return voiture
    } catch (e) {
      throw e
    }
  }

  getVoitures = async () => {
    try {
      const list = await Voiture.find();
      console.log(list);
      return list
    } catch (e) {
      throw e
    }
  }

  getVoitureByClient = async (idClient) => {
    try {
      const list = await Voiture.find({idClient: idClient});
      return list;
    } catch (e) {
      throw e;
    }
  }

  updateToGarage = async (idVoiture) => {
    try {
      const depotUpdate = await Voiture.findOneAndUpdate({_id: idVoiture}, {$set: {dans_garage: "true"}}, {new: true})
      return depotUpdate;
    } catch (e) {

    }
  }
  testAgreg = async () => {
    try {
      const list = await Voiture.aggregate([
        {
          $match: {'personne._id':{$eq:'63d128aac9e05e9cad861604'}}
        },
        {
          $lookup: {
            from: "personne",
            localField: "_id",
            foreignField: "voiture",
            as: "personne"
          }
        },
        // {
        //   $project: {
        //     "matricule": 1,
        //     "personne.nom": 1,
        //     "personne.mail": 1
        //   }
        // }
      ]);
      console.log(list);
      return list
    } catch (e) {
      throw e
    }
  }
}

module.exports = {VoitureService}
