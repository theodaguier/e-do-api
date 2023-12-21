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
var current_session_model_1 = __importDefault(require("../models/current-session.model"));
var CurrentSessionsController = /** @class */ (function () {
    function CurrentSessionsController() {
    }
    CurrentSessionsController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentSessions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, current_session_model_1.default.getCurrentSessions()];
                    case 1:
                        currentSessions = _a.sent();
                        res.json(currentSessions);
                        return [2 /*return*/];
                }
            });
        });
    };
    CurrentSessionsController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, currentSession;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, current_session_model_1.default.getCurrentSessionsById(id)];
                    case 1:
                        currentSession = _a.sent();
                        res.json(currentSession);
                        return [2 /*return*/];
                }
            });
        });
    };
    CurrentSessionsController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, client, reservations, equipments, notes, status_1, createdAt, endAt, session, sessionData, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        _a = req.body, client = _a.client, reservations = _a.reservations, equipments = _a.equipments, notes = _a.notes, status_1 = _a.status, createdAt = _a.createdAt, endAt = _a.endAt;
                        return [4 /*yield*/, current_session_model_1.default.getCurrentSessionsById(id)];
                    case 1:
                        session = _b.sent();
                        if (!req.body) {
                            throw new Error("Session does not exist");
                        }
                        sessionData = {
                            id: id,
                            client: client,
                            reservations: reservations,
                            equipments: equipments,
                            notes: notes,
                            status: status_1,
                            createdAt: createdAt,
                            endAt: endAt,
                        };
                        // Met à jour la session
                        return [4 /*yield*/, current_session_model_1.default.updateCurrentSession(id, sessionData)];
                    case 2:
                        // Met à jour la session
                        _b.sent();
                        res.json(session);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.status(500).json({ error: err_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CurrentSessionsController.prototype.updateEquipment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, equipment, session, sessionData, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        equipment = req.body.equipment;
                        return [4 /*yield*/, current_session_model_1.default.getCurrentSessionsById(id)];
                    case 1:
                        session = _a.sent();
                        if (!req.body) {
                            throw new Error("Session does not exist");
                        }
                        sessionData = {
                            id: id,
                            equipment: equipment,
                        };
                        // Met à jour la session
                        return [4 /*yield*/, current_session_model_1.default.updateCurrentSession(id, sessionData)];
                    case 2:
                        // Met à jour la session
                        _a.sent();
                        res.json(session);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.status(500).json({ error: err_2.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CurrentSessionsController.prototype.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, client, reservations, equipments, notes, status_2, createdAt, endAt, updatedAt, session, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, client = _a.client, reservations = _a.reservations, equipments = _a.equipments, notes = _a.notes, status_2 = _a.status, createdAt = _a.createdAt, endAt = _a.endAt, updatedAt = _a.updatedAt;
                        // Vérifie si l'identifiant de session est valide
                        if (!id) {
                            throw new Error("Session id is required");
                        }
                        session = {
                            id: id,
                            client: client,
                            reservations: reservations,
                            equipments: equipments,
                            createdAt: createdAt,
                            endAt: endAt,
                            updatedAt: updatedAt,
                        };
                        // Crée la session
                        console.log("session:", session);
                        return [4 /*yield*/, current_session_model_1.default.createCurrentSession(session)];
                    case 1:
                        _b.sent();
                        res.json(session);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        res.status(500).json({ error: err_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CurrentSessionsController.prototype.stopSession = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, session, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, current_session_model_1.default.getCurrentSessionsById(id)];
                    case 1:
                        session = _a.sent();
                        if (!req.body) {
                            throw new Error("Session does not exist");
                        }
                        return [4 /*yield*/, current_session_model_1.default.stopSession(id)];
                    case 2:
                        _a.sent();
                        res.json(session);
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CurrentSessionsController;
}());
exports.default = new CurrentSessionsController();
