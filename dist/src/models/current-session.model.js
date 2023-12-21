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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("../services/auth"));
var CurrentSessionsModel = /** @class */ (function () {
    function CurrentSessionsModel() {
        this.googleSheetsAuth = new auth_1.default();
        this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
        this.columns = [
            "id",
            "name",
            "address",
            "phone",
            "siren",
            "reservations",
            "equipments",
            "notes",
            "createdBy",
            "lastUpdatedBy",
            "status",
            "createdAt",
            "endAt",
            "updatedAt",
        ];
    }
    CurrentSessionsModel.prototype.getCurrentSessions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessions, auth, getRows, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessions = [];
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A3:N",
                            })];
                    case 2:
                        getRows = _a.sent();
                        rows = getRows.data.values;
                        if (rows) {
                            rows.map(function (row, index) {
                                var session = {
                                    id: row[0],
                                    name: row[1],
                                    address: row[2],
                                    phone: row[3],
                                    siren: row[4],
                                    reservations: [],
                                    equipments: row[6].split(" ").map(function (equipment) { return ({
                                        name: equipment,
                                        quantity: 1,
                                    }); }),
                                    notes: row[7],
                                    createdBy: row[8],
                                    lastUpdatedBy: row[9],
                                    status: row[10],
                                    createdAt: row[11],
                                    endAt: row[12],
                                    updatedAt: row[13],
                                };
                                if (index > 0) {
                                    session.reservations = session.reservations.concat(sessions[index - 1].reservations);
                                }
                                row[5].split(", ").forEach(function (reservation) {
                                    var _a = reservation.split(" "), hours = _a[0], machine = _a[1];
                                    var hoursInt = parseInt(hours);
                                    session.reservations.push({
                                        hours: hoursInt,
                                        machine: machine,
                                    });
                                });
                                sessions.push(session);
                                return session;
                            });
                        }
                        return [2 /*return*/, sessions];
                }
            });
        });
    };
    CurrentSessionsModel.prototype.getCurrentSessionsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sessions, auth, getRows, rows, filteredSessions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessions = [];
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A3:N",
                            })];
                    case 2:
                        getRows = _a.sent();
                        rows = getRows.data.values;
                        rows === null || rows === void 0 ? void 0 : rows.map(function (row, index) {
                            var session = {
                                id: row[0],
                                name: row[1],
                                address: row[2],
                                phone: row[3],
                                siren: row[4],
                                reservations: [],
                                equipments: [],
                                notes: row[7],
                                createdBy: row[8],
                                lastUpdatedBy: row[9],
                                status: row[10],
                                createdAt: row[11],
                                endAt: row[12],
                                updatedAt: row[13],
                            };
                            row[5].split(", ").forEach(function (reservation) {
                                var _a = reservation.split(" "), hours = _a[0], machine = _a[1];
                                var hoursInt = parseInt(hours);
                                session.reservations.push({
                                    hours: hoursInt,
                                    machine: machine,
                                });
                            });
                            row[6].split(", ").forEach(function (equipment) {
                                var _a = equipment.split(" ("), name = _a[0], quantity = _a[1];
                                var quantityInt = parseInt(quantity);
                                session.equipments.push({
                                    name: name,
                                    quantity: quantityInt,
                                });
                            });
                            sessions.push(session);
                            return session;
                        });
                        filteredSessions = sessions.filter(function (session) { return session.id === id; });
                        if (!filteredSessions.length) {
                            return [2 /*return*/, {}];
                        }
                        return [2 /*return*/, filteredSessions[0]];
                }
            });
        });
    };
    CurrentSessionsModel.prototype.updateCurrentSession = function (id, sessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, getRows, rows, sessionIndex, sessionRow, existingEquipments, _loop_1, _i, _a, equipmentData, sessionRowIndex, writeRow, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _b.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A2:N",
                            })];
                    case 2:
                        getRows = _b.sent();
                        rows = getRows.data.values;
                        sessionIndex = rows === null || rows === void 0 ? void 0 : rows.findIndex(function (row) { return row[0] === id; });
                        sessionRow = rows === null || rows === void 0 ? void 0 : rows.find(function (row) { return row[0] === id; });
                        if (!sessionRow) {
                            throw new Error("Session does not exist");
                        }
                        existingEquipments = sessionRow[6]
                            ? sessionRow[6].split(", ").map(function (item) {
                                var _a = item.split(" ("), equipment = _a[0], quantity = _a[1];
                                return {
                                    name: equipment,
                                    quantity: parseInt(quantity),
                                };
                            })
                            : [];
                        if (sessionData.equipments) {
                            _loop_1 = function (equipmentData) {
                                var existingEquipment = existingEquipments.find(function (item) { return item.name === equipmentData.name; });
                                if (existingEquipment) {
                                    existingEquipment.quantity += equipmentData.quantity;
                                }
                                else {
                                    existingEquipments.push(equipmentData);
                                }
                            };
                            for (_i = 0, _a = sessionData.equipments; _i < _a.length; _i++) {
                                equipmentData = _a[_i];
                                _loop_1(equipmentData);
                            }
                        }
                        sessionRow[6] = existingEquipments
                            .map(function (equipment) { return "".concat(equipment.name, " (").concat(equipment.quantity, ")"); })
                            .join(", ");
                        if (sessionData.reservations !== undefined) {
                            sessionRow[5] = sessionData.reservations
                                .map(function (reservation) { return "".concat(reservation.hours, " ").concat(reservation.machine); })
                                .join(", ");
                        }
                        if (sessionData.status !== undefined) {
                            sessionRow[10] = sessionData.status;
                        }
                        sessionRowIndex = rows === null || rows === void 0 ? void 0 : rows.indexOf(sessionRow);
                        return [4 /*yield*/, auth.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A".concat(sessionRowIndex + 2, ":N").concat(sessionRowIndex + 2),
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [sessionRow],
                                },
                            })];
                    case 3:
                        writeRow = _b.sent();
                        return [2 /*return*/, writeRow.data.values];
                    case 4:
                        err_1 = _b.sent();
                        return [2 /*return*/, { error: err_1.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CurrentSessionsModel.prototype.updateSessionEquipment = function (id, sessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, getRows, rows, sessionRow, writeRow, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A3:J",
                            })];
                    case 2:
                        getRows = _a.sent();
                        rows = getRows.data.values;
                        sessionRow = rows === null || rows === void 0 ? void 0 : rows.filter(function (row) { return row[0] === id; })[0];
                        if (!sessionRow) {
                            throw new Error("Session does not exist");
                        }
                        sessionRow[6] = sessionData.equipments
                            .map(function (equipment) { return "".concat(equipment.name, " (").concat(equipment.quantity || 0, ")"); })
                            .join(", ");
                        return [4 /*yield*/, auth.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A3".concat(sessionRow, ":J").concat(sessionRow),
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [sessionRow],
                                },
                            })];
                    case 3:
                        writeRow = _a.sent();
                        return [2 /*return*/, writeRow.data.values];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CurrentSessionsModel.prototype.createCurrentSession = function (sessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, sessionRow, writeRow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        sessionData.status = "pending";
                        sessionRow = [
                            sessionData.id,
                            sessionData.name,
                            sessionData.address,
                            sessionData.phone,
                            sessionData.siren,
                            sessionData.reservations
                                .map(function (reservation) {
                                return "".concat(reservation.hours, "h ").concat(reservation.machine);
                            })
                                .join(", "),
                            (sessionData.equipments || [])
                                .map(function (equipment) {
                                return "".concat(equipment.name, " (").concat(equipment.quantity, ")");
                            })
                                .join(", "),
                            sessionData.notes,
                            sessionData.createdBy,
                            sessionData.lastUpdatedBy,
                            sessionData.status,
                            sessionData.createdAt,
                            sessionData.endAt,
                            sessionData.updatedAt,
                        ];
                        return [4 /*yield*/, auth.spreadsheets.values.append({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A3:N",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [sessionRow],
                                },
                            })];
                    case 2:
                        writeRow = _a.sent();
                        return [2 /*return*/, writeRow.data.values];
                }
            });
        });
    };
    CurrentSessionsModel.prototype.stopSession = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, getRows, currentSessionsRows, sessionRow, sessionIndex, archivedSessionsRow, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A3:J",
                            })];
                    case 2:
                        getRows = _a.sent();
                        currentSessionsRows = getRows.data ? getRows.data.values : [];
                        sessionRow = currentSessionsRows.find(function (row) { return row[0] === id; });
                        if (!sessionRow) {
                            throw new Error("Session does not exist");
                        }
                        sessionIndex = currentSessionsRows.findIndex(function (session) { return session[0] === id; });
                        if (!(sessionIndex > -1)) return [3 /*break*/, 4];
                        currentSessionsRows.splice(sessionIndex, 1);
                        return [4 /*yield*/, auth.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: "CurrentSessions!A".concat(sessionIndex + 3, ":J"),
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: currentSessionsRows,
                                },
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        archivedSessionsRow = __spreadArray(__spreadArray([], sessionRow, true), [""], false);
                        return [4 /*yield*/, auth.spreadsheets.values.append({
                                spreadsheetId: this.spreadsheetId,
                                range: "ArchivedSessions!A2:J",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [archivedSessionsRow],
                                },
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, { success: true }];
                    case 6:
                        err_3 = _a.sent();
                        return [2 /*return*/, { error: err_3.message }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return CurrentSessionsModel;
}());
exports.default = CurrentSessionsModel;
