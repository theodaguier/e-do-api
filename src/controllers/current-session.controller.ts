//@ts-nocheck
import CurrentSessionsModel from "../models/current-session.model";
import { Request, Response } from "express";

class CurrentSessionsController {
  async get(req: Request, res: Response) {
    const currentSessions = await CurrentSessionsModel.get();
    res.json(currentSessions);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const currentSession = await CurrentSessionsModel.getById(id);

    res.json(currentSession);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        client,
        reservations,
        equipments,
        notes,
        status,
        createdAt,
        endAt,
      } = req.body;

      // Vérifie si la session existe
      const session = await CurrentSessionsModel.getById(id);
      if (!req.body) {
        throw new Error("Session does not exist");
      }

      // Crée un objet de session
      const sessionData = {
        id,
        client,
        reservations,
        equipments,
        notes,
        status,
        createdAt,
        endAt,
      };

      // Met à jour la session
      await CurrentSessionsModel.update(id, sessionData);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async updateEquipment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { equipment } = req.body;

      // Vérifie si la session existe
      const session = await CurrentSessionsModel.getById(id);
      if (!req.body) {
        throw new Error("Session does not exist");
      }

      // Crée un objet de session
      const sessionData = {
        id,
        equipment,
      };

      // Met à jour la session
      await CurrentSessionsModel.update(id, sessionData as any);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async post(req: Request, res: Response) {
    try {
      const {
        id,
        client,
        reservations,
        equipments,
        notes,
        status,
        createdAt,
        endAt,
        updatedAt,
      } = req.body;

      // Vérifie si l'identifiant de session est valide
      if (!id) {
        throw new Error("Session id is required");
      }

      const session = {
        id,
        client,
        reservations,
        equipments,
        createdAt,
        endAt,
        updatedAt,
      };

      // Crée la session

      console.log("session:", session);
      await CurrentSessionsModel.create(session);

      res.json(session);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async stop(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const session = await CurrentSessionsModel.getById(id);
      if (!req.body) {
        throw new Error("Session does not exist");
      }

      await CurrentSessionsModel.stop(id);

      res.json(session);
    } catch (err) {
      return { error: (err as Error).message };
    }
  }
}

export default new CurrentSessionsController();
