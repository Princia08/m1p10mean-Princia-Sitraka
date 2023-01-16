const { Personne } = require("../models/personne.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class PersonneService{
    create = async (body) => {
        try{
            const personne = new Personne(body)
            personne.mot_de_passe = bcrypt.hashSync(personne.mot_de_passe, 10)
            await personne.save()
            personne.mot_de_passe = null
            return personne
        }catch(e){ throw e }
    }

    login = async ({mail, mot_de_passe}) => {
        try{
            const personne = await Personne.findOne({mail})
            console.log(personne)
            if(!personne) throw {status: 404, message: 'Utilisateur invalide'}
            if(!bcrypt.compareSync(mot_de_passe, personne.mot_de_passe)) throw {status: 405, message: 'Mot de passe incorrect'}
            return jwt.sign({...personne, mot_de_passe: undefined}, process.env.SECRET)
        }catch(e){ throw e }

    }
}

module.exports = { PersonneService }