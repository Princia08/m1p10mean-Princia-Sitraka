const {Voiture} = require("../models/voiture.model");

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

}

module.exports = {VoitureService}
