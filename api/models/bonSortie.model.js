const mongoose = require('mongoose')

const BonSortieSchema = new mongoose.Schema({
  valide: {
    type: mongoose.Schema.Types.String,
    default: "false"
  },
  reparation: {
    ref: 'reparation',
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
})

const BonSortie = mongoose.model('bonSortie', BonSortieSchema)

module.exports = {BonSortieSchema, BonSortie}
