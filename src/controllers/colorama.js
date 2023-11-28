const { ColoramaModel } = require("../models");

class ColoramaController {
  async get(req, res) {
    const { id, name, color, qty } = req.query;

    const colorama = await ColoramaModel.getColoramas();

    if (!colorama) {
      return res.status(404).send("colorama not found");
    }

    res.json(colorama);
  }

  // async getById(req, res) {
  //   const { id } = req.params;
  //   const equipment = await EquipmentModel.getEquipmentById(id);

  //   if (!equipment) {
  //     return res.status(404).send("Equipment not found");
  //   }

  //   res.json(equipment);
  // }

  async post(req, res) {
    const { id, name, color, qty } = req.body;

    const colorama = {
      id,
      name,
      color,
      qty,
    };

    const newColorama = await ColoramaModel.createColoramas(colorama);

    res.json(newColorama);
  }
}

module.exports = new ColoramaController();
