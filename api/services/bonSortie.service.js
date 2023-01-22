const {BonSortie} = require("../models/bonSortie.model");
const PDFDocument = require('pdfkit');
const fs = require('fs');

class BonSortieService {
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
      const bonSortie = await BonSortie.findOne({reparation: idReparation}).populate({
        path: 'reparation',
        populate: {path: 'voiture'},
      });
      return bonSortie;
    } catch (e) {
      throw e;
    }
  };

  generatePdf = async (idReparation) => {
    try {
      const bonSortie = await this.getBonSortie(idReparation);
      const doc = new PDFDocument();
      // console.log("bonsortie : " + bonSortie);
      const path = 'static/';
      const file = 'bon_de_sortie.pdf';
      const filePath = path + file;

// Pipe the document to a file
      doc.pipe(fs.createWriteStream(filePath));

// Add a title
      doc.fontSize(25).text('Bon de sortie de réparation de véhicule', {
        underline: true,
        align: 'center'
      });

// Add some text
      doc.fontSize(12).text('Date : ' + new Date().toLocaleString(), {
        align: 'right'
      });

      doc.moveDown();

      doc.text('Nom du garage : ' + 'GarGlass', {
        align: 'left'
      });
      doc.text('Adresse : ' + 'Andavamamba', {
        align: 'left'
      });
      doc.text('Téléphone : ' + '+261 34 34 343 34', {
        align: 'left'
      });
      doc.text('Email : ' + 'ps@garglass.com', {
        align: 'left'
      });

      doc.moveDown();

      doc.text('Nom du client : ' + 'John Doe', {
        align: 'left'
      });
      doc.text('Téléphone : ' + '+1 555 555 5555', {
        align: 'left'
      });
      doc.text('Email : ' + 'johndoe@example.com', {
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

      doc.text('- Remplacement des plaquettes de frein', {
        align: 'left'
      });
      doc.text('- Vidange d\'huile', {
        align: 'left'
      });
      doc.text('- Réparation de la fuite d\'huile', {
        align: 'left'
      });
      doc.moveDown();

      doc.text('Prix total : ' + '$ 500', {
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
