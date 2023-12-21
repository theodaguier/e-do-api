import express from "express";
import EquipmentController from "../controllers/equipment.controller";

const router = express.Router();

router.get(
  "/:cat",
  EquipmentController.getByCategory.bind(EquipmentController)
);
router.get("/all", EquipmentController.get.bind(EquipmentController));
// router.get("/:id", EquipmentController.getById.bind(EquipmentController));

router.get(
  "/only-equipments",
  EquipmentController.getOnlyEquipment.bind(EquipmentController)
);

router.post("/", EquipmentController.post.bind(EquipmentController));

// router.post("/:cat", EquipmentController.postbyCat.bind(EquipmentController));

export default router;
