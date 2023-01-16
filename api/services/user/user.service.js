const { User } = require("../../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService{
    create = async (body) => {
        try{
            const user = new User(body)
            user.password = bcrypt.hashSync(user.password, 10)
            await user.save()
            user.password = null
            return user
        }catch(e){ throw e }
    }

    login = async ({username, password}) => {
        try{
            const user = await User.findOne({username})
            if(!user) throw {status: 404, message: 'User not found'}
            if(!bcrypt.compareSync(password, user.password)) throw {status: 405, message: 'Wrong password'}
            return jwt.sign({...user, password: undefined}, process.env.SECRET)
        }catch(e){ throw e }

    }
}

module.exports = { UserService }