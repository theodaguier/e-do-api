// const session = {
//   id: row[0],
//   name: row[1],
//   address: row[2],
//   phone: row[3],
//   siren: row[4],
//   reservations: [],
//   equipments: row[6].split(" ").map((equipment) => ({
//     name: equipment,
//     quantity: 1,
//   })),
//   notes: row[7],
//   createdBy: row[8],
//   lastUpdatedBy: row[9],
//   status: row[10],
//   createdAt: row[11],
//   endAt: row[12],
//   updatedAt: row[13],
//   vertical: row[14],
//   horizontal: row[15],
//   eclipse: row[16],
//   live: row[17],
//   cyclorama: row[18],
// };

const { CurrentSessionsModel, EquipmentModel } = require("../models");

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
      const {
        id,
        client,
        reservations,
        equipments,
        notes,
        status,
        createdAt,
        endAt,
        updatedAt,
        live,
        vertical,
        horizontal,
        eclipse,
        cyclorama,
      } = req.body;

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
        notes,
        status,
        createdAt,
        endAt,
        updatedAt,
        live,
        vertical,
        horizontal,
        eclipse,
        cyclorama,
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
        notes,
        status,
        createdAt,
        endAt,
        updatedAt,
        live,
        vertical,
        horizontal,
        eclipse,
        cyclorama,
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
        notes,
        status,
        createdAt,
        endAt,
        updatedAt,
        live,
        vertical,
        horizontal,
        eclipse,
        cyclorama,
      };

      // Crée la session

      console.log("session:", session);
      await CurrentSessionsModel.createCurrentSession(session);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async stopSession(req, res) {
    try {
      const { id } = req.params;

      const session = await CurrentSessionsModel.getCurrentSessionsById(id);
      if (!session) {
        throw new Error("Session does not exist");
      }

      await CurrentSessionsModel.stopSession(id);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CurrentSessionsController();
