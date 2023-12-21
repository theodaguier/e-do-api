"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var equipment_model_1 = __importDefault(require("../models/equipment.model"));
var EquipmentController = /** @class */ (function () {
    function EquipmentController() {
    }
    EquipmentController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, cat, price, qty, equipment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, id = _a.id, name = _a.name, cat = _a.cat, price = _a.price, qty = _a.qty;
                        return [4 /*yield*/, equipment_model_1.default.getEquipment()];
                    case 1:
                        equipment = _b.sent();
                        if (!req.query) {
                            return [2 /*return*/, res.status(404).send("Equipment not found")];
                        }
                        res.json(equipment);
                        return [2 /*return*/];
                }
            });
        });
    };
    EquipmentController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, equipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, equipment_model_1.default.getEquipmentById(id)];
                    case 1:
                        equipment = _a.sent();
                        if (!req.query) {
                            return [2 /*return*/, res.status(404).send("Equipment not found")];
                        }
                        res.json(equipment);
                        return [2 /*return*/];
                }
            });
        });
    };
    EquipmentController.prototype.getByCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cat, equipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cat = req.params.cat;
                        console.log(cat);
                        return [4 /*yield*/, equipment_model_1.default.getEquipmentByCategory(cat)];
                    case 1:
                        equipment = _a.sent();
                        if (!req.query) {
                            return [2 /*return*/, res.status(404).send("Equipment not found")];
                        }
                        res.json(equipment);
                        return [2 /*return*/];
                }
            });
        });
    };
    EquipmentController.prototype.getOnlyEquipment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var equipments, filteredEquipments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, equipment_model_1.default.getEquipment()];
                    case 1:
                        equipments = _a.sent();
                        filteredEquipments = Array.isArray(equipments)
                            ? equipments.filter(function (equipment) {
                                return equipment.id !== null &&
                                    equipment.name !== null &&
                                    equipment.cat !== null &&
                                    equipment.price !== null &&
                                    equipment.qty !== null &&
                                    equipment.cat !== "consumables" &&
                                    equipment.cat !== "Category" &&
                                    equipment.id;
                            })
                            : [];
                        // Envoyer la réponse au client
                        res.json(filteredEquipments);
                        return [2 /*return*/];
                }
            });
        });
    };
    EquipmentController.prototype.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, cat, price, qty, equipment, newEquipment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, name = _a.name, cat = _a.cat, price = _a.price, qty = _a.qty;
                        equipment = {
                            id: id,
                            name: name,
                            cat: cat,
                            price: price,
                            qty: qty,
                        };
                        return [4 /*yield*/, equipment_model_1.default.createEquipment(equipment)];
                    case 1:
                        newEquipment = _b.sent();
                        res.json(newEquipment);
                        return [2 /*return*/];
                }
            });
        });
    };
    EquipmentController.prototype.updateEquipment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cat, updatedEquipments, updatedEquipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cat = req.params.cat;
                        updatedEquipments = req.body;
                        return [4 /*yield*/, equipment_model_1.default.updateEquipmentByCategory(updatedEquipments, cat)];
                    case 1:
                        updatedEquipment = _a.sent();
                        res.json(updatedEquipment);
                        return [2 /*return*/];
                }
            });
        });
    };
    return EquipmentController;
}());
exports.default = new EquipmentController();
