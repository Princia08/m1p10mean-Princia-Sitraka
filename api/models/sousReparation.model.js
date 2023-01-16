const mongoose = require('mongoose')

const SousReparationSchema = new mongoose.Schema({
    reparation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reparation'
    },
    montant : {
        type: mongoose.Schema.Types.Double
    },
    status : {
        type: mongoose.Schema.Types.String
    }
})

const SousReparation = mongoose.model('sousReparation', SousReparationSchema)

module.exports = {SousReparationSchema, SousReparation}