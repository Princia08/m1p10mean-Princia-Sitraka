const { PersonneService } = require("../services/personne.service")

class PersonneController{
    constructor(personneService){
        this.personneService = personneService
    }
    
    create = async (req, res) => {
        try{ res.json(await this.personneService.create(req.body)) }
        catch(e){ res.status(500).json({message: 'Internal Server Error'}) }
    }

    login = async (req, res) => {
        try { res.json({token: (await this.personneService.login(req.body))}) }
        catch(e){ res.status(e.status || 500).json({message: e.message || 'Internal Server Error'}) }
    }
}

module.exports = {PersonneController}
