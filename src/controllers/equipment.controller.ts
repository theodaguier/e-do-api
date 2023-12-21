import EquipmentModel from "../models/equipment.model";
import { Request, Response } from "express";

class EquipmentController {
  async get(req: Request, res: Response) {
    const { id, name, cat, price, qty } = req.query;

    const equipment = await EquipmentModel.getEquipment();

    if (!req.query) {
      return res.status(404).send("Equipment not found");
    }

    res.json(equipment);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const equipment = await EquipmentModel.getEquipmentById(id);

    if (!req.query) {
      return res.status(404).send("Equipment not found");
    }

    res.json(equipment);
  }

  async getByCategory(req: Request, res: Response) {
    const { cat } = req.params;
    console.log(cat);
    const equipment = await EquipmentModel.getEquipmentByCategory(cat);

    if (!req.query) {
      return res.status(404).send("Equipment not found");
    }

    res.json(equipment);
  }

  async getOnlyEquipment(req: Request, res: Response) {
    const equipments = await EquipmentModel.getEquipment();

    // Filtrer les objets avec id et name null
    const filteredEquipments = Array.isArray(equipments)
      ? equipments.filter(
          (equipment: {
            id: null;
            name: null;
            cat: string | null;
            price: null;
            qty: null;
          }) =>
            equipment.id !== null &&
            equipment.name !== null &&
            equipment.cat !== null &&
            equipment.price !== null &&
            equipment.qty !== null &&
            equipment.cat !== "consumables" &&
            equipment.cat !== "Category" &&
            equipment.id
        )
      : [];

    // Envoyer la réponse au client
    res.json(filteredEquipments);
  }

  async post(req: Request, res: Response) {
    const { id, name, cat, price, qty } = req.body;

    const equipment = {
      id,
      name,
      cat,
      price,
      qty,
    };

    const newEquipment = await EquipmentModel.createEquipment(equipment);

    res.json(newEquipment);
  }

  async updateEquipment(req: Request, res: Response) {
    const { cat } = req.params;
    const updatedEquipments = req.body;

    const updatedEquipment = await EquipmentModel.updateEquipmentByCategory(
      updatedEquipments,
      cat
    );

    res.json(updatedEquipment);
  }
}

export default new EquipmentController();
