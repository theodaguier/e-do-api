const express = require("express");
const app = express();
const router = express.Router();

const { EquipmentController } = require("../controllers");

router.get("/", EquipmentController.get.bind(EquipmentController));
router.get("/:id", EquipmentController.getById.bind(EquipmentController));
router.get(
  "/:cat",
  EquipmentController.getByCategory.bind(EquipmentController)
);

router.post("/", EquipmentController.post.bind(EquipmentController));

module.exports = router;