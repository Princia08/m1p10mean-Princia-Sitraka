const mongoose = require('mongoose')

const DepotSchema = new mongoose.Schema({
    voiture: {
        ref: 'voiture',
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    valide: {
        type: mongoose.Schema.Types.String,
        default:"false"
    }
})

const Depot = mongoose.model('depot', DepotSchema)

module.exports = {DepotSchema, Depot}
