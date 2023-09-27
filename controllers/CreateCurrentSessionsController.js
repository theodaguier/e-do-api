const { CreateCurrentSessionsModel, SessionModel } = require("../models");

class CreateCurrentSessionsController {
  async post(req, res) {
    try {
      // Extrait les données de la requête POST
      const { client, reservations, equipments, createdAt, endAt } = req.body;

      // Continuez avec le traitement des données
      const session = new SessionModel(
        {
          address: client.address,
          name: client.name,
          phone: client.phone,
          siren: client.siren,
        },
        reservations || [],
        equipments || [],
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
