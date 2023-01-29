function FactureRouter(base) {

  const service = new FactureService()
  const controller = new FactureController(service)

  app.post(`/api/${base}`, controller.create);
}

module.exports = {FactureRouter}
