const {Reparation} = require("../models/reparation.model");

class ReparationService {

  create = async (body) => {
    try {
      const reparation = new Reparation(body);
      await reparation.save();
      return reparation;
    } catch (e) {
      throw e
    }
  }
}

module.exports = {ReparationService}
