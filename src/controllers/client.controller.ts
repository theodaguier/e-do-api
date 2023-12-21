import { Request, Response } from "express";
import ClientModel from "../models/client.model";

class ClientController {
  async get(req: Request, res: Response) {
    const { id, name, address, brand, siren, phone, email } = req.query;

    const clients = await ClientModel.getClients();

    if (id) {
      return res.status(404).send("Client not found");
    }

    res.json(clients);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const client = await ClientModel.getClientById(id);

    // if (!client) {
    //   return res.status(404).send("Client not found");
    // }

    res.json(client);
  }

  async post(req: Request, res: Response) {
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

export default new ClientController();
