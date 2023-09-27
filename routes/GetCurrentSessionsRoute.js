const express = require("express");
const router = express.Router();

const { GetCurrentSessionsController } = require("../controllers");

router.get(
  "/",
  GetCurrentSessionsController.get.bind(GetCurrentSessionsController)
);

module.exports = router;
