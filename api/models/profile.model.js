const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: true
    },
})

const Profile = mongoose.model('profile', ProfileSchema)

module.exports = {ProfileSchema, Profile}