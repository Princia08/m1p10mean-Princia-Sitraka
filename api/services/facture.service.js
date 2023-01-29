const { Facture } = require("../models/facture.model");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cheerio = require('cheerio');

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
      const facture = await Facture.find({ idClient: idClient }).populate({ path: 'idReparation', populate: { path: 'voiture' } });
      return facture;
    }
    catch (e) {
      throw e;
    }
  }

  generatePdf = async (idReparation) => {
    try {
      // const bonSortie = await this.getBonSortie(idReparation);
      const doc = new PDFDocument();
      const path = 'static/';
      const file = 'facture.pdf';
      const filePath = path + file;

      // Pipe the document to a file
      doc.pipe(fs.createWriteStream(filePath));

      //  title
      // doc.fontSize(25).text('Facture N : ' + bonSortie.reparation.voiture.marque + ' ' + bonSortie.reparation.voiture.model, {
      doc.fontSize(20).text('Facture N 8646846cfsdrf864fcsd ', {
        underline: true,
        align: 'center'
      });

      doc.moveDown();
      
      //  text
      doc.fontSize(12).text('Date : ' + new Date().toLocaleString(), { align: 'right' });

      doc.text('Nom du garage : ' + 'GarGlass', { align: 'left' });
      doc.text('Adresse : ' + 'Ivandry', { align: 'left' });
      doc.text('Téléphone : ' + '+261 34 34 343 34', { align: 'left' });
      doc.text('Email : ' + 'ps@garglass.com', { align: 'left' });

      doc.moveDown();

      // doc.text('Nom du client : ' + bonSortie.reparation.voiture.idClient.nom, {
      //   align: 'left'
      // });
      // doc.text('Adresse : ' + bonSortie.reparation.voiture.idClient.adresse, {
      //   align: 'left'
      // });
      // doc.text('Email : ' + bonSortie.reparation.voiture.idClient.mail, {
      //   align: 'left'
      // });

      // doc.moveDown();

      // doc.text('Marque et modèle : ' + bonSortie.reparation.voiture.marque + ' ' + bonSortie.reparation.voiture.model, {
      //   align: 'left'
      // });
      // doc.text('Numéro d\'immatriculation : ' + bonSortie.reparation.voiture.matricule, {
      //   align: 'left'
      // });

      doc.moveDown();
      doc.moveDown();





      // Table data
      var data = [
        ['Name', 'Age', 'Address'],
        ['John Doe', '30', '123 Main St'],
        ['Jane Smith', '25', '456 Park Ave']
      ];

      // Table widths
      var widths = [100, 50, 150];

      // Draw the table headers
      doc.font('Helvetica-Bold');
      for (var i = 0; i < data[0].length; i++) {
        doc.text(data[0][i], (i * 150) + 20, 200);
      }

      // Draw the table rows
      doc.font('Helvetica');
      for (var i = 1; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          doc.text(data[i][j], (j * 150) + 20, (i * 20) + 210);
        }
      }



      // End the document
      doc.end();

      return filePath;

    } catch (e) {
      throw e
    }
  }

}

module.exports = { FactureService }
