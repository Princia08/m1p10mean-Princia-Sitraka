const mongoose = require('mongoose')

const ReparationSchema = new mongoose.Schema({
    date_entree : {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    date_sortie : {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    avancement : {
        type: mongoose.Schema.Types.String,
        required: true
    },
    voiture : {
        ref: 'voiture',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
})

const Reparation = mongoose.model('reparation', ReparationSchema)

module.exports = {ReparationSchema, Reparation}