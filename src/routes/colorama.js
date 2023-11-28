const express = require("express");
const app = express();
const router = express.Router();

const { ColoramaController } = require("../controllers");

router.get("/", ColoramaController.get.bind(ColoramaController));
router.post(
  "/:id",
  ColoramaController.updateColoramas.bind(ColoramaController)
);

router.post("/", ColoramaController.post.bind(ColoramaController));

module.exports = router;
