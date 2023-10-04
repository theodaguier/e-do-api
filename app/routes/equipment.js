const express = require("express");
const app = express();
const router = express.Router();

const { EquipmentController } = require("../controllers");

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

module.exports = router;
