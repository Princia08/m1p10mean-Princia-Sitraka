const {app} = require("./modules/app/app.module")
const path = require('path')
const {load} = require("./modules/database/database.module")
const {PersonneRouter} = require("./router/personne.router")
const {VoitureRouter} = require("./router/voiture.router");
const {DepotRouter} = require("./router/depot.router");
const {ReparationRouter} = require("./router/reparation.router");
const {SousReparationRouter} = require("./router/sousreparation.router");
const {BonSortieRouter} = require("./router/bonSortie.router");
const {DepenseRouter} = require("./router/depense.router");
const { FactureRouter } = require("./router/facture.router");

async function main() {
  try {
    await load()
    // app.get('/api/test', (req, res) => res.json({message: 'Ok Bee'}))

    PersonneRouter('personne')
    VoitureRouter('voiture')
    DepotRouter('depot')
    ReparationRouter('reparation')
    SousReparationRouter('sousReparation')
    BonSortieRouter('bonSortie')
    DepenseRouter('depense')
    FactureRouter('facture')

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/m1p10mean-Princia-Sitraka/index.html')))

    app.listen(process.env.PORT, () => console.log(`Start on ${process.env.PORT}`))
  } catch (e) {
    console.error(e)
  }
}

module.exports = {main}
