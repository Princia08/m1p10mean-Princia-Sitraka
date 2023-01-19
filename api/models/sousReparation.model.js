const mongoose = require('mongoose')

const SousReparationSchema = new mongoose.Schema({
    motif : {
      type: mongoose.Schema.Types.String,
      default: "null"
    },
    reparation : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reparation'
    },
    montant : {
        type: mongoose.Schema.Types.Number,
    },
    status : {
        type: mongoose.Schema.Types.String
    }
})

const SousReparation = mongoose.model('sousReparation', SousReparationSchema)

module.exports = {SousReparationSchema, SousReparation}
