const express = require("express");
const router = express.Router();

const { CreateCurrentSessionsController } = require("../controllers");

router.post("/", CreateCurrentSessionsController.post);

module.exports = router;
