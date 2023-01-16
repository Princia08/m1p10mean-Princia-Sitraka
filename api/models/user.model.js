const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = {UserSchema, User}