"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var colorama_controller_1 = __importDefault(require("../controllers/colorama.controller"));
var router = express_1.default.Router();
router.get("/", colorama_controller_1.default.get.bind(colorama_controller_1.default));
router.post("/:id", colorama_controller_1.default.updateColoramas.bind(colorama_controller_1.default));
router.post("/", colorama_controller_1.default.post.bind(colorama_controller_1.default));
exports.default = router;
