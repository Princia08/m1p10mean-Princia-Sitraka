const mongoose = require('mongoose')

const VoitureSchema = new mongoose.Schema({
    idClient : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'personne',
        required: false,
        default: null
    },
    matricule : {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    marque : {
        type: mongoose.Schema.Types.String,
        default: null
    },
    model : {
        type: mongoose.Schema.Types.String,
        default: null
    },
    dans_garage : {
        type: mongoose.Schema.Types.Boolean
    }
})

const Voiture = mongoose.model('voiture', VoitureSchema)

module.exports = {VoitureSchema, Voiture}