const mongoose = require('mongoose')

const PersonneSchema = new mongoose.Schema({
    nom : {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true    
    },
    mail : {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    mot_de_passe : {
        type: mongoose.Schema.Types.String,
        required: true
    },
    adresse : {
        type: mongoose.Schema.Types.String,
        default: null
    },
    role : {
        type: mongoose.Schema.Types.String,
        default: "client"
    }
})

const Personne = mongoose.model('personne', PersonneSchema)

module.exports = {PersonneSchema, Personne}