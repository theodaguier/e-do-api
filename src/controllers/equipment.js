const { EquipmentModel } = require("../models");

class EquipmentController {
  async get(req, res) {
    const { id, name, cat, price, qty } = req.query;

    const equipment = await EquipmentModel.getEquipment();

    if (!equipment) {
      return res.status(404).send("Equipment not found");
    }

    res.json(equipment);
  }

  async getById(req, res) {
    const { id } = req.params;
    const equipment = await EquipmentModel.getEquipmentById(id);

    if (!equipment) {
      return res.status(404).send("Equipment not found");
    }

    res.json(equipment);
  }

  async getByCategory(req, res) {
    const { cat } = req.params;
    console.log(cat);
    const equipment = await EquipmentModel.getEquipmentByCategory(cat);

    if (!equipment) {
      return res.status(404).send("Equipment not found");
    }

    res.json(equipment);
  }

  async getOnlyEquipment(req, res) {
    const equipments = await EquipmentModel.getEquipment();

    // Filtrer les objets avec id et name null
    const filteredEquipments = equipments.filter(
      (equipment) =>
        equipment.id !== null &&
        equipment.name !== null &&
        equipment.cat !== null &&
        equipment.price !== null &&
        equipment.qty !== null &&
        equipment.cat !== "consumables" &&
        equipment.cat !== "Category" &&
        equipment.id
    );

    // Envoyer la réponse au client
    res.json(filteredEquipments);
  }

  async post(req, res) {
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
  async updateEquipmentByCategory(req, res) {
    const { cat } = req.params;
    const updatedEquipments = req.body;

    const updatedEquipment = await EquipmentModel.updateEquipmentByCategory(
      updatedEquipments,
      cat
    );

    res.json(updatedEquipment);
  }
}

module.exports = new EquipmentController();
