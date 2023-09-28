const { CreateCurrentSessionsModel, SessionModel } = require("../models");

class CreateCurrentSessionsController {
  async post(req, res) {
    try {
      const { client, reservations, equipments, createdAt, endAt } = req.body;

      const session = new SessionModel(
        client,
        reservations,
        equipments,
        createdAt,
        endAt
      );

      const currentSessions =
        await CreateCurrentSessionsModel.createCurrentSession(session);

      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CreateCurrentSessionsController();
