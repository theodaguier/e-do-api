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

  async update(req, res) {
    try {
      const { id } = req.params;
      const { client, reservations, equipments, createdAt, endAt, updatedAt } =
        req.body;

      // Vérifie si la session existe
      const session = await CurrentSessionsModel.getCurrentSessionsById(id);
      if (!session) {
        throw new Error("Session does not exist");
      }

      // Crée un objet de session
      const sessionData = {
        id,
        client,
        reservations,
        equipments,
        createdAt,
        endAt,
        updatedAt,
      };

      // Met à jour la session
      await CurrentSessionsModel.updateCurrentSession(id, sessionData);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateEquipment(req, res) {
    try {
      const { id } = req.params;
      const { equipment } = req.body;

      // Vérifie si la session existe
      const session = await CurrentSessionsModel.getCurrentSessionsById(id);
      if (!session) {
        throw new Error("Session does not exist");
      }

      // Mettez à jour la session avec les données d'équipement
      session.equipments.push(equipment);

      // Met à jour la session
      await CurrentSessionsModel.updateSessionEquipment(id, session);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async post(req, res) {
    try {
      const {
        id,
        client,
        reservations,
        equipments,
        createdAt,
        endAt,
        updatedAt,
      } = req.body;

      // Vérifie si l'identifiant de session est valide
      if (!id) {
        throw new Error("Session id is required");
      }

      const session = {
        id,
        client,
        reservations,
        equipments,
        createdAt,
        endAt,
        updatedAt,
      };

      // Crée la session

      console.log("session:", session);
      await CurrentSessionsModel.createCurrentSession(session);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CurrentSessionsController();
