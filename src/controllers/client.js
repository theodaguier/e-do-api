const ClientModel = require("../models/");

class ClientController {
  async get(req, res) {
    const { id, name, address, brand, siren, phone, email } = req.query;

    const clients = await ClientModel.getClients();

    if (!client) {
      return res.status(404).send("Client not found");
    }

    res.json(client);
  }

  async getById(req, res) {
    const { id } = req.params;
    const client = await ClientModel.getClientById(id);

    if (!client) {
      return res.status(404).send("Client not found");
    }

    res.json(client);
  }

  async post(req, res) {
    const { id, name, address, brand, siren, phone, email } = req.body;

    const client = {
      id,
      name,
      address,
      brand,
      siren,
      phone,
      email,
    };

    const newClient = await ClientModel.createClient(client);

    res.json(newClient);
  }
}

module.exports = new ClientController();
