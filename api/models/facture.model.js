const mongoose = require('mongoose')

const FactureSchema = new mongoose.Schema({
    etat_paiement: {
        type: mongoose.Schema.Types.String
    },
    reparation: {
        ref: 'reparation',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
})

const Facture = mongoose.model('facture', FactureSchema)

module.exports = {FactureSchema, Facture}