const {Voiture} = require("../models/voiture.model");
const {Depot} = require("../models/depot.model");

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
  updateToGarage = async (idVoiture) =>{
    try {
      const depotUpdate = await Voiture.findOneAndUpdate({_id: idVoiture}, {$set: {dans_garage: "true"}}, {new: true})
      return depotUpdate;
    }catch (e) {

    }
  }

}

module.exports = {VoitureService}
