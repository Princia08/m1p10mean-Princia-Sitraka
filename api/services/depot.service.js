const {Depot} = require("../models/depot.model");
const {SousReparation} = require("../models/sousReparation.model");

class DepotService {

  create = async (body) => {
    try {
      const depot = new Depot(body);
      await depot.save();
      return depot;
    } catch (e) {
      throw e
    }
  }
  update = async (idDepot) => {
    try {
      const depotUpdate = await Depot.findOneAndUpdate({_id: idDepot}, {$set: {valide: "true"}}, {new: true})
      return depotUpdate;
    } catch (e) {
      throw e
    }
  }

  getDepots = async () => {
    try {
      // var query = {"voiture._id": "63c6f662ee0ffe8a2568f86c"};
      const list = await Depot.find({valide: "false"}).populate({
        path: 'voiture',
        populate: {path: 'idClient'}
      });
      // const sousReparation = SousReparation.find({reparation: idReparation}).populate({
      //   path: 'reparation',
      //   populate: {path: 'voiture'}
      // });
      console.log(list);
      return list
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
}

module.exports = {DepotService}
