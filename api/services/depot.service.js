const {Depot} = require("../models/depot.model");

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
}

module.exports = {DepotService}
