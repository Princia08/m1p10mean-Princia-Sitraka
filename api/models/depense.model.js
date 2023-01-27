const mongoose = require('mongoose')

const DepenseSchema = new mongoose.Schema({
    description: {
        type: mongoose.Schema.Types.String
    },
    montant: {
        type: mongoose.Schema.Types.Number
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
})

const Depense = mongoose.model('depense', DepenseSchema)

module.exports = {DepenseSchema, Depense}
