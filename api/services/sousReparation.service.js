class SousReparationService{
  create = async (body) => {
    try{
      const personne = new Personne(body)
      personne.mot_de_passe = bcrypt.hashSync(personne.mot_de_passe, 10)
      await personne.save()
      personne.mot_de_passe = null
      return personne
    }catch(e){ throw e }
  }
}

module.exports = { SousReparationService }
