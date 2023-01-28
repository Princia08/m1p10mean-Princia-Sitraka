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
      const list = await Depense.find();
      console.log(list);
      return list
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  getTotalMois = async () => {
    try {
      const list = await Depense.aggregate([
        {
          $group: {
            _id: { $month: "$date" },
            total: { $sum: "$montant" }
          }
        },
        {
          $project: {
            _id: {
              $concat: [
                { $toString: "$_id" },
                "-",
                { $cond: { if: { $lt: ["$_id", 10] }, then: "0", else: "" } },
                { $toString: "$_id" }
              ]
            },
            total: 1
          }
        }
      ]);
      return list
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
}

module.exports = {DepenseService}
