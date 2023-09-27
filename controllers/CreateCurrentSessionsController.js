const { CreateCurrentSessionsModel } = require("../models");

class CreateCurrentSessionsController {
  async post(req, res) {
    try {
      const currentSessions =
        await CreateCurrentSessionsModel.createCurrentSessions();
      res.json(currentSessions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CreateCurrentSessionsController();
