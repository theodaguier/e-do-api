import ColoramaModel from "../models/colorama.model";
import { Request, Response } from "express";

class ColoramaController {
  async get(req: Request, res: Response) {
    const { id, name, color, qty } = req.query;

    const colorama = await ColoramaModel.getColoramas();

    // if (!colorama) {
    //   return res.status(404).send("colorama not found");
    // }

    res.json(colorama);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const colorama = await ColoramaModel.getColoramaById(id);

    // if (!colorama) {
    //   return res.status(404).send("colorama not found");
    // }

    res.json(colorama);
  }

  async post(req: Request, res: Response) {
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

  async updateColoramas(req: Request, res: Response) {
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

export default new ColoramaController();
