"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var equipment_controller_1 = __importDefault(require("../controllers/equipment.controller"));
var router = express_1.default.Router();
router.get("/:cat", equipment_controller_1.default.getByCategory.bind(equipment_controller_1.default));
router.get("/all", equipment_controller_1.default.get.bind(equipment_controller_1.default));
// router.get("/:id", EquipmentController.getById.bind(EquipmentController));
router.get("/only-equipments", equipment_controller_1.default.getOnlyEquipment.bind(equipment_controller_1.default));
router.post("/", equipment_controller_1.default.post.bind(equipment_controller_1.default));
// router.post("/:cat", EquipmentController.postbyCat.bind(EquipmentController));
exports.default = router;
