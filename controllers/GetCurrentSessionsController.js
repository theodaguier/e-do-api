const { GetCurrentSessionsModel } = require("../models");

class GetCurrentSessionsController {
  async get(req, res) {
    const currentSessions = await GetCurrentSessionsModel.getCurrentSessions();
    res.json(currentSessions);
  }
}

module.exports = new GetCurrentSessionsController();
