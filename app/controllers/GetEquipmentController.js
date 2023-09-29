const { getEquipmentModel } = require("../models");

class GetEquipmentController {
  async get(req, res) {
    const equipment = await getEquipmentModel.getEquipment();
    res.json(equipment);
  }

  async getById(req, res) {
    const { id } = req.params;
    const equipment = await getEquipmentModel.getEquipmentById(id);
    res.json(equipment);
  }
}
