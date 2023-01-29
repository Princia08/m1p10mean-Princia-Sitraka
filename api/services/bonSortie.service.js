const {BonSortie} = require("../models/bonSortie.model");
const {SousReparationService} = require("./sousReparation.service");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const serviceSousrep = require('./sousReparation.service');
const mongoose = require("mongoose");


class BonSortieService {
  constructor() {
    this.serviceSousReparation =  new SousReparationService();
  }
  create = async (body) => {
    try {
      const bonSortie = new BonSortie(body)
      await bonSortie.save()
      return bonSortie;
    } catch (e) {
      throw e
    }
  }
  update = async (idReparation) => {
    try {
      const bsUpdate = await BonSortie.findOneAndUpdate({reparation: idReparation}, {$set: {valide: "true"}}, {new: true})
      return bsUpdate;
    } catch (e) {
      throw e
    }
  }

  getBonSortie = async (idReparation) => {
    try {
      const bonSortie = await BonSortie.findOne({reparation: idReparation}).sort({createdAt: -1}).populate({
        path: 'reparation',
        populate: {path: 'voiture', populate: {path: 'idClient'}},
      });
      return bonSortie;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };
  getListeSousReparation = async (idReparation) => {
    try {
      const sousreparations = await BonSortie.aggregate([
        {
          $match: {reparation: mongoose.Types.ObjectId(idReparation)},
        },
        {
          $lookup: {
            from: "reparations",
            localField: "reparation",
            foreignField: "_id",
            as: "reparation"
          }
        },
        {
          $lookup: {
            from: "sousreparations",
            localField: "reparation._id",
            foreignField: "reparation",
            as: "sousreparation"
          }
        },
        {
          $unwind: "$sousreparation"
        },
        {
          $project: {
            _id: 1,
            motif: "$sousreparation.motif",
            montant: "$sousreparation.montant"
          }
        },
      ]);
      return sousreparations;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };


  generatePdf = async (idReparation) => {
    try {
      const bonSortie = await this.getBonSortie(idReparation);
      let sousReparation = await this.getListeSousReparation(idReparation);
      const montantTotal = (await  this.serviceSousReparation.getMontantTotal(idReparation))[0].totalMontant;
      // console.log(montantTotal);

      const doc = new PDFDocument();
      const path = 'static/';
      const file = 'bon_de_sortie.pdf';
      const filePath = path + file;

      console.log(serviceSousrep);

// Pipe the document to a file
      doc.pipe(fs.createWriteStream(filePath));

//  title
      doc.fontSize(25).text('Bon de sortie : ' + bonSortie.reparation.voiture.marque + ' ' + bonSortie.reparation.voiture.model, {
        underline: true,
        align: 'center'
      });

//  text
      doc.fontSize(12).text('Date : ' + bonSortie.date.toLocaleString(), {
        align: 'right'
      });

      doc.moveDown();

      doc.text('Nom du garage : ' + 'GarGlass', {
        align: 'left'
      });
      doc.text('Adresse : ' + 'Ivandry', {
        align: 'left'
      });
      doc.text('Téléphone : ' + '+261 34 34 343 34', {
        align: 'left'
      });
      doc.text('Email : ' + 'ps@garglass.com', {
        align: 'left'
      });

      doc.moveDown();

      doc.text('Nom du client : ' + bonSortie.reparation.voiture.idClient.nom, {
        align: 'left'
      });
      doc.text('Adresse : ' + bonSortie.reparation.voiture.idClient.adresse, {
        align: 'left'
      });
      doc.text('Email : ' + bonSortie.reparation.voiture.idClient.mail, {
        align: 'left'
      });

      doc.moveDown();

      doc.text('Marque et modèle : ' + bonSortie.reparation.voiture.marque + ' ' + bonSortie.reparation.voiture.model, {
        align: 'left'
      });
      doc.text('Numéro d\'immatriculation : ' + bonSortie.reparation.voiture.matricule, {
        align: 'left'
      });

      doc.moveDown();
      doc.moveDown();

      doc.text('Réparations effectuées : ', {
        align: 'left'
      });

      sousReparation.forEach(sousRep => {
        doc.text('- ' + sousRep.motif + ' : ' + sousRep.montant + ' Ar', {
          align: 'left'
        });
      });

      doc.moveDown();

      doc.text('Prix total : ' + montantTotal +' Ar', {
        align: 'right'
      });
      doc.moveDown();

      doc.text('Remarques : ', {
        align: 'left'
      });
      doc.text('- Les pièces de rechange utilisées sont garanties 6 mois.', {
        align: 'left'
      });
      doc.text('- La garantie de la réparation est valable 3 mois.', {
        align: 'left'
      });

// End the document
      doc.end();
      return filePath;
    } catch (e) {
      console.log(e.message);
      throw e
    }
  }

}

module.exports = {BonSortieService}
