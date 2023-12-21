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
var auth_1 = __importDefault(require("../services/auth"));
var EquipmentModel = /** @class */ (function () {
    function EquipmentModel(id, name, cat, price, qty) {
        this.googleSheetsAuth = new auth_1.default();
        this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
        this.id = id;
        this.name = name;
        this.cat = cat;
        this.price = price;
        this.qty = qty;
    }
    EquipmentModel.getEquipmentById = function (id) {
        throw new Error("Method not implemented.");
    };
    EquipmentModel.createEquipment = function (equipment) {
        throw new Error("Method not implemented.");
    };
    EquipmentModel.updateEquipmentByCategory = function (updatedEquipments, cat) {
        throw new Error("Method not implemented.");
    };
    EquipmentModel.getEquipmentByCategory = function (cat) {
        throw new Error("Method not implemented.");
    };
    EquipmentModel.getEquipment = function () {
        throw new Error("Method not implemented.");
    };
    EquipmentModel.prototype.getEquipment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var equipments, auth, getRows, rows, filteredEquipments, equipmentsWithId, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        equipments = [];
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "Equipments!A2:E",
                            })];
                    case 2:
                        getRows = _a.sent();
                        rows = getRows.data.values;
                        filteredEquipments = rows === null || rows === void 0 ? void 0 : rows.slice(1).map(function (row, index) {
                            var equipment = {
                                id: Number(row[0]),
                                name: row[1],
                                cat: row[2],
                                price: Number(row[3]),
                                qty: Number(row[4]),
                            };
                            return equipment;
                        });
                        equipmentsWithId = filteredEquipments === null || filteredEquipments === void 0 ? void 0 : filteredEquipments.filter(function (equipment) { return equipment.id !== null; });
                        return [2 /*return*/, equipmentsWithId];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: err_1.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EquipmentModel.prototype.getEquipmentById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var equipments, equipment, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getEquipment()];
                    case 1:
                        equipments = _a.sent();
                        equipment = equipments === null || equipments === void 0 ? void 0 : equipments.find(function (equipment) { return equipment.id === id; });
                        return [2 /*return*/, equipment];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EquipmentModel.prototype.getEquipmentByCategory = function (cat) {
        return __awaiter(this, void 0, void 0, function () {
            var equipments, equipmentsByCategory, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getEquipment()];
                    case 1:
                        equipments = _a.sent();
                        equipmentsByCategory = equipments === null || equipments === void 0 ? void 0 : equipments.filter(function (equipment) { return equipment.cat === cat; });
                        return [2 /*return*/, equipmentsByCategory];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, { error: err_3.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EquipmentModel.prototype.getOnlyEquipment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var equipments, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getEquipment()];
                    case 1:
                        equipments = _a.sent();
                        return [2 /*return*/, equipments];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EquipmentModel.prototype.createEquipment = function (equipment) {
        return __awaiter(this, void 0, void 0, function () {
            var equipments, newId, newEquipment, auth, firstEmptyRow, appendRow, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getEquipment()];
                    case 1:
                        equipments = (_a.sent());
                        newId = equipments.length + 1;
                        newEquipment = {
                            id: newId,
                            name: equipment.name,
                            cat: equipment.cat,
                            price: equipment.price,
                            qty: equipment.qty,
                        };
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 2:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        firstEmptyRow = equipments.findIndex(function (equipment) { return equipment.name === ""; });
                        return [4 /*yield*/, auth.spreadsheets.values.append({
                                spreadsheetId: this.spreadsheetId,
                                range: "Equipments!A".concat(firstEmptyRow + 2, ":E").concat(firstEmptyRow + 2),
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        [
                                            newEquipment.id,
                                            newEquipment.name,
                                            newEquipment.cat,
                                            newEquipment.price,
                                            newEquipment.qty,
                                        ],
                                    ],
                                },
                            })];
                    case 3:
                        appendRow = _a.sent();
                        return [2 /*return*/, newEquipment];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, { error: err_5.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EquipmentModel.prototype.updateEquipmentByCategory = function (updatedEquipments, cat) {
        return __awaiter(this, void 0, void 0, function () {
            var allEquipments, equipmentsToUpdate, auth, _loop_1, this_1, _i, _a, updatedEquipment, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.getEquipment()];
                    case 1:
                        allEquipments = (_b.sent());
                        equipmentsToUpdate = allEquipments.filter(function (equipment) { return equipment.cat === cat; });
                        // Authentification Google Sheets
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 2:
                        // Authentification Google Sheets
                        _b.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        _loop_1 = function (updatedEquipment) {
                            var indexToUpdate, range, values, resource, valueInputOption;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        indexToUpdate = allEquipments.findIndex(function (equipment) { return equipment.id === updatedEquipment.id; });
                                        if (!(indexToUpdate !== -1)) return [3 /*break*/, 2];
                                        allEquipments[indexToUpdate].id = updatedEquipment.id;
                                        allEquipments[indexToUpdate].name = updatedEquipment.name;
                                        allEquipments[indexToUpdate].price = updatedEquipment.price;
                                        allEquipments[indexToUpdate].qty = updatedEquipment.qty;
                                        range = "Equipments!A".concat(indexToUpdate + 3, ":E").concat(indexToUpdate + 3);
                                        values = [
                                            [
                                                allEquipments[indexToUpdate].id,
                                                allEquipments[indexToUpdate].name,
                                                allEquipments[indexToUpdate].cat,
                                                allEquipments[indexToUpdate].price,
                                                allEquipments[indexToUpdate].qty,
                                            ],
                                        ];
                                        resource = { values: values };
                                        valueInputOption = "USER_ENTERED";
                                        return [4 /*yield*/, auth.spreadsheets.values.update({
                                                spreadsheetId: this_1.spreadsheetId,
                                                range: range,
                                                resource: resource,
                                                valueInputOption: valueInputOption,
                                            })];
                                    case 1:
                                        _c.sent();
                                        _c.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = updatedEquipments;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        updatedEquipment = _a[_i];
                        return [5 /*yield**/, _loop_1(updatedEquipment)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, allEquipments];
                    case 7:
                        err_6 = _b.sent();
                        return [2 /*return*/, { error: err_6.message }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return EquipmentModel;
}());
exports.default = EquipmentModel;
