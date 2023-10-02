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
}

module.exports = new EquipmentController();
