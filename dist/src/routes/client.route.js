"use strict";
var express = require("express");
var router = express.Router();
var app = express();
var CurrentSessionsController = require("../controllers").CurrentSessionsController;
router.get("/", CurrentSessionsController.get.bind(CurrentSessionsController));
router.get("/:id", CurrentSessionsController.getById.bind(CurrentSessionsController));
router.post("/", CurrentSessionsController.post.bind(CurrentSessionsController));
module.exports = router;
