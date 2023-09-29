const express = require("express");
const router = express.Router();

const { GetEquipmentController } = require("../controllers");

router.get("/", GetEquipmentController.get.bind(GetEquipmentController));

// router.get("/:id", GetEquipmentController.getById.bind(GetEquipmentController));
