const {Voiture} = require("../models/voiture.model");
const {Depot} = require("../models/depot.model");

class VoitureService {
  create = async (body) => {
    try {
      const personne = new Personne(body)
      personne.mot_de_passe = bcrypt.hashSync(personne.mot_de_passe, 10)
      await personne.save()
      personne.mot_de_passe = null
      return personne
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
