const { CurrentSessionsModel } = require("../models");

class CurrentSessionsController {
  async get(req, res) {
    const currentSessions = await CurrentSessionsModel.getCurrentSessions();
    res.json(currentSessions);
  }

  async getById(req, res) {
    const { id } = req.params;
    const currentSession = await CurrentSessionsModel.getCurrentSessionsById(
      id
    );
    res.json(currentSession);
  }

  async post(req, res) {
    try {
      const { id, client, reservations, equipments, createdAt, endAt } =
        req.body;

      const session = {
        id,
        client,
        reservations,
        equipments,
        createdAt,
        endAt,
      };

      const currentSessions = await CurrentSessionsModel.createCurrentSession(
        session
      );

      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CurrentSessionsController();
