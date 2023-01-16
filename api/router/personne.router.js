const { PersonneController } = require('../controllers/personne.controller')
const {PersonneService} = require('../services/personne.service')
const {app} = require('../modules/app/app.module')

function PersonneRouter(base){

    const service = new PersonneService()
    const controller = new PersonneController(service)

    app.post(`/api/${base}`, controller.create)
    app.post(`/api/${base}/login`, controller.login)
}

module.exports = {PersonneRouter}