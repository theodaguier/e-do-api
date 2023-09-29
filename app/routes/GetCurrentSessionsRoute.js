const express = require("express");
const router = express.Router();

const { GetCurrentSessionsController } = require("../controllers");

router.get(
  "/",
  GetCurrentSessionsController.get.bind(GetCurrentSessionsController)
);

router.get(
  "/:id",
  GetCurrentSessionsController.getById.bind(GetCurrentSessionsController)
);

module.exports = router;
