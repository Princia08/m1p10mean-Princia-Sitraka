const mongoose = require("mongoose");
const {Facture} = require("../models/facture.model");
const {SousReparationService} = require('../services/sousReparation.service')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const {DepenseService} = require("./depense.service");

class FactureService {
  constructor() {
    this.sousReparationService = new SousReparationService();
    this.depenseService = new DepenseService();
  }

  create = async (body) => {
    try {
      const facture = new Facture(body);
      await facture.save();
      return facture;
    } catch (e) {
      throw e
    }
  }

  getMontantTotalParFacture = async (idFacture) => {
    try {
      const montant = await Facture.aggregate([
          {
            $match: {
              $and: [
                {_id: mongoose.Types.ObjectId(idFacture)},
                {etat_paiement: "paid"}
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
  getCA = async (date1, date2) => {
    try {
      const startDate = new Date(date1);
      const endDate = new Date(date2);

      const montant = await Facture.aggregate([
        {
          $match: {
            $and: [
              {etat_paiement: "paid"},
              {date: {$gte: startDate, $lte: endDate}},
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
          $unwind: "$sousReparations"
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$date"
              }
            },
            total: {
              $sum: "$sousReparations.montant"
            }
          }
        },
      ]);
      return montant;
    } catch (e) {
      throw e;
    }
  }
  getCAMois = async (month) => {
    try {
      const moisNext = month+1;
      const startDate = new Date(`2023-${month}-01`);
      const endDate = new Date(`2023-${moisNext}-01`);

      const montant = await Facture.aggregate([
        {
          $match: {
            $and: [
              {etat_paiement: "paid"},
              {date: {$gte: startDate, $lte: endDate}},
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
          $unwind: "$sousReparations"
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: "$date"
              }
            },
            total: {
              $sum: "$sousReparations.montant"
            }
          }
        },
      ]);
      // console.log("result : " + montant);
      return montant;
    } catch (e) {
      throw e;
    }
  }
  getBenefice = async (mois) => {
    try {
      const ca = await this.getCAMois(mois+1);
      const depense = await this.depenseService.getTotalMois(mois);
      const benefice = ca[0].total - depense[0].total;
      console.log("ca :" + ca[0].total);
      console.log("benefice :" + depense[0].total);
      return benefice;
    } catch (e) {
      throw e;
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


  getFactureById = async (idFacture) => {
    try {
      const facture = await Facture.findOne({_id: idFacture}).populate({
        path: 'idReparation',
        populate: {path: 'voiture', populate: {path: 'idClient'}}
      });
      return facture;
    } catch (e) {
      throw e;
    }
  }

  getFactureUnpaid = async () => {
    try {
      const factureList = await Facture.find({etat_paiement: "unpaid"}).populate({
        path: 'idReparation',
        populate: {path: 'voiture', populate: {path: 'idClient'}}
      });

      let montantList = [];
      for (let facture of factureList) {
        montantList.push((await this.sousReparationService.getMontantTotal(facture.idReparation))[0].totalMontant);
      }
      let result = [];
      result = [factureList, montantList];
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  updateEtatPaiement = async (idFacture) => {
    try {
      const factureUpdated = await Facture.findOneAndUpdate({_id: idFacture}, {$set: {etat_paiement: "paid"}}, {new: true})
      return factureUpdated;
    } catch (e) {
      throw e
    }
  }

  getFactureById = async (idFacture) => {
    try {
      const facture = await Facture.findOne({_id: idFacture}).populate({
        path: 'idReparation',
        populate: {path: 'voiture', populate: {path: 'idClient'}}
      });
      return facture;
    } catch (e) {
      throw e;
    }
  }


  generatePdf = async (idFacture) => {
    try {
      const facture = await this.getFactureById(idFacture);
      const sousReparationList = await this.sousReparationService.getSousReparation(facture.idReparation);
      const montantTotal = (await this.sousReparationService.getMontantTotal(facture.idReparation))[0].totalMontant;
      const doc = new PDFDocument();
      const path = 'static/';
      const file = 'facture.pdf';
      const filePath = path + file;

      // Pipe the document to a file
      doc.pipe(fs.createWriteStream(filePath));

      //  title
      doc.fontSize(20).text('Facture n ' + facture._id, {
        underline: true,
        align: 'center'
      });

      doc.moveDown();

      //  text
      doc.fontSize(12).text('Date de création : ' + facture.date.toISOString(), {align: 'right'});
      doc.moveDown();

      doc.text('Nom du garage : ' + 'GarGlass', {align: 'right'});
      doc.text('Adresse : ' + 'Ivandry', {align: 'right'});
      doc.text('Téléphone : ' + '+261 34 34 343 34', {align: 'right'});
      doc.text('Email : ' + 'ps@garglass.com', {align: 'right'});

      doc.moveDown();

      doc.text('Nom du client : ' + facture.idReparation.voiture.idClient.nom, 50, 147);
      doc.text('Adresse : ' + facture.idReparation.voiture.idClient.adresse, {align: 'left'});
      doc.text('Email : ' + facture.idReparation.voiture.idClient.mail, {align: 'left'});

      doc.moveDown();

      doc.text('Votre voiture : ' + facture.idReparation.voiture.marque + ' ' + facture.idReparation.voiture.model, 50, 217);
      doc.text('Numéro d\'immatriculation : ' + facture.idReparation.voiture.matricule, 335, 217);

      //draw a line
      doc.moveTo(0, 235).lineTo(800, 235).stroke({width: 1})

      doc.moveDown();
      var data = [
        ['Description', 'Prix (Ar)']
      ]
      for (let sousReparation of sousReparationList) {
        data.push([sousReparation.motif, sousReparation.montant])
      }
    } catch (e) {
    }
  }
}

module.exports = {FactureService}
