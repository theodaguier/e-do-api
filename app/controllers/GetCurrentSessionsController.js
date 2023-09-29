const { GetCurrentSessionsModel } = require("../models");

class GetCurrentSessionsController {
  async get(req, res) {
    const currentSessions = await GetCurrentSessionsModel.getCurrentSessions();
    res.json(currentSessions);
  }

  async getById(req, res) {
    const { id } = req.params;
    const currentSession = await GetCurrentSessionsModel.getCurrentSessionsById(
      id
    );
    res.json(currentSession);
  }
}

module.exports = new GetCurrentSessionsController();
