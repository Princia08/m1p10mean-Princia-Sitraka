const mongoose = require('mongoose')

const FactureSchema = new mongoose.Schema({
    etat_paiement: {
        type: mongoose.Schema.Types.String,
        default: "unpaid"
    },
    idReparation: {
        ref: 'reparation',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    idClient: {
        ref: 'personne',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: mongoose.now
    }
})

const Facture = mongoose.model('facture', FactureSchema)

module.exports = {FactureSchema, Facture}