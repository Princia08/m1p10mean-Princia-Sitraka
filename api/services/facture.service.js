class FactureService {

  create = async (body) => {
    try {
      const facture = new Facture(body);
      await facture.save();
      return facture;
    } catch (e) {
      throw e
    }
  }
}

module.exports = {FactureService}
