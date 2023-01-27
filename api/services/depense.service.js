const {Depot} = require("../models/depot.model");
const {Depense} = require("../models/depense.model");

class DepenseService {

  create = async (body) => {
    try {
      const depense = new Depense(body);
      await depense.save();
      return depense;
    } catch (e) {
      throw e
    }
  }

  getDepenses = async () => {
    try {
      const list = await Depenses.find({valide: "false"}).populate({
        path: 'voiture',
        populate: {path: 'idClient'}
      });
      console.log(list);
      return list
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
}

module.exports = {DepenseService}
