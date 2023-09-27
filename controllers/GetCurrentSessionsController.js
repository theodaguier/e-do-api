const { GetCurrentSessionsModel } = require("../models");

class GetCurrentSessionsController {
  async get(req, res) {
    try {
      const currentSessions =
        await GetCurrentSessionsModel.getCurrentSessions();
      res.json(currentSessions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new GetCurrentSessionsController();
