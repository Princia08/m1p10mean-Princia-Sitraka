const { UserController } = require('../../controllers/user/user.controller')
const {UserService} = require('../../services/user/user.service')
const {app} = require('../../modules/app/app.module')

function UserRouter(base){

    const service = new UserService()
    const controller = new UserController(service)

    // app.post(`/api/${base}`, controller.create)
    // app.post(`/api/${base}/login`, controller.login)
}

module.exports = {UserRouter}