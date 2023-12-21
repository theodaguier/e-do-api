import express from "express";
import ColoramaController from "../controllers/colorama.controller";

const router = express.Router();

router.get("/", ColoramaController.get.bind(ColoramaController));

router.post(
  "/:id",
  ColoramaController.updateColoramas.bind(ColoramaController)
);

router.post("/", ColoramaController.post.bind(ColoramaController));

export default router;
