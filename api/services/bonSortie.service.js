const {BonSortie} = require("../models/bonSortie.model");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const {Depot} = require("../models/depot.model");

class BonSortieService {
  create = async (body) => {
    try {
      const sousrep = new BonSortie(body)
      await sousrep.save()
      return sousrep;
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
  getBonDeSortiePDF = async (idReparation) => {
    try {
      const bonSortie = await this.getBonSortie(idReparation);
      const doc = new PDFDocument();
      console.log("bonsortie "+ bonSortie);

    } catch (e) {
      console.log(e.message);
      throw e
    }
  }

}

module.exports = {BonSortieService}
