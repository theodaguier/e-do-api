const express = require("express");
const app = express();
const router = express.Router();

const { ColoramaController } = require("../controllers");

router.get("/", ColoramaController.get.bind(ColoramaController));

router.post("/", ColoramaController.post.bind(ColoramaController));

// router.post("/:cat", EquipmentController.postbyCat.bind(EquipmentController));

module.exports = router;
