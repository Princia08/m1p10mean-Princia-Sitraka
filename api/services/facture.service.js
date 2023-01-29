const {Facture} = require("../models/facture.model");
const mongoose = require("mongoose");

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
      const facture = await Facture.find({idClient: idClient}).populate({
        path: 'idReparation',
        populate: {path: 'voiture'}
      });
      return facture;
    } catch (e) {
      throw e;
    }
  }
  getMontantTotalParFacture = async (idFacture) => {
    try {
      const montant = await Facture.aggregate([
          {
            $match: {
              $and: [
                {_id: mongoose.Types.ObjectId(idFacture)},
                {etat_paiement: "unpaid"}
              ]
            }
          },
          {
            $lookup: {
              from: "reparations",
              localField: "idReparation",
              foreignField: "_id",
              as: "reparation"
            }
          },
          {
            $lookup: {
              from: "sousreparations",
              localField: "reparation._id",
              foreignField: "reparation",
              as: "sousReparations"
            }
          },
          {
            $project: {
              total: {$sum: '$sousReparations.montant'}
            }
          },
        ])
      ;
      return montant;
    } catch (e) {
      throw e;
    }
  }
  getCA = async () => {
    try {
      const montant = await Facture.aggregate([
          {
            $match: {etat_paiement: "unpaid"}
          },
          {
            $lookup: {
              from: "reparations",
              localField: "idReparation",
              foreignField: "_id",
              as: "reparation"
            }
          },
          {
            $lookup: {
              from: "sousreparations",
              localField: "reparation._id",
              foreignField: "reparation",
              as: "sousReparations"
            }
          },
          {
            $group: {
              _id: {
                day: {$dayOfMonth: "$date"},
                month: {$month: "$date"},
                year: {$year: "$date"}
              },
              total: {$sum: "$sousReparations.montant"}
            }
          },
        ])
      ;
      return montant;
    } catch (e) {
      throw e;
    }
  }

}

module.exports = {FactureService}
