const mongoose = require('mongoose')

const ReparationSchema = new mongoose.Schema({
    date_entree : {
        type: mongoose.Schema.Types.Date,
        required: false,
        default: Date.now
    },
    date_sortie : {
        type: mongoose.Schema.Types.Date,
        required: false,
        default: null
    },
    avancement : {
        type: mongoose.Schema.Types.String,
        required: false,
        default: "en cours"
    },
    voiture : {
        ref: 'voiture',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    idClient : {
        ref: 'personne',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
})

const Reparation = mongoose.model('reparation', ReparationSchema)

module.exports = {ReparationSchema, Reparation}
