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

  async getById(req, res) {
    const { id } = req.params;

    const colorama = await ColoramaModel.getColoramaById(id);

    if (!colorama) {
      return res.status(404).send("colorama not found");
    }

    res.json(colorama);
  }

  async post(req, res) {
    const { id, name, color, qty } = req.body;

    const colorama = {
      id,
      name,
      color,
      qty,
    };

    const newColorama = await ColoramaModel.updateColoramas(colorama);

    res.json(newColorama);
  }

  async updateColoramas(req, res) {
    const colorama = req.body;

    // const colorama = {
    //   id,
    //   name,
    //   color,
    //   qty,
    // };

    const updatedColorama = await ColoramaModel.updateColoramas(colorama);

    res.json(updatedColorama);
  }
}

module.exports = new ColoramaController();
