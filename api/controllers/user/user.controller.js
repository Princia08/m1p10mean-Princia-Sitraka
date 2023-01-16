const { UserService } = require("../../services/user/user.service")

class UserController{
    constructor(userService){
        this.userService = userService
    }
    
    create = async (req, res) => {
        try{ res.json(await this.userService.create(req.body)) }
        catch(e){ res.status(500).json({message: 'Internal Server Error'}) }
    }

    login = async (req, res) => {
        try { res.json({token: (await this.userService.login(req.body))}) }
        catch(e){ res.status(e.status || 500).json({message: e.message || 'Internal Server Error'}) }
    }
}

module.exports = {UserController}
