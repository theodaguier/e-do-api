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
var ColoramaModel = /** @class */ (function () {
    function ColoramaModel(_a) {
        var id = _a.id, name = _a.name, color = _a.color, qty = _a.qty;
        this.googleSheetsAuth = new auth_1.default();
        this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
        this.id = id;
        this.name = name;
        this.color = color;
        this.qty = qty;
    }
    ColoramaModel.getColoramaById = function (id) {
        throw new Error("Method not implemented.");
    };
    ColoramaModel.updateColoramas = function (colorama) {
        throw new Error("Method not implemented.");
    };
    ColoramaModel.getColoramas = function () {
        throw new Error("Method not implemented.");
    };
    ColoramaModel.prototype.getColoramas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var auth, getRows, rows, filteredColoramas, coloramasWithId, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, (auth === null || auth === void 0 ? void 0 : auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "Coloramas!A2:D",
                            }))];
                    case 2:
                        getRows = _a.sent();
                        rows = getRows === null || getRows === void 0 ? void 0 : getRows.data.values;
                        filteredColoramas = rows === null || rows === void 0 ? void 0 : rows.slice(1).map(function (row, index) {
                            var colorama = {
                                id: Number(row[0]),
                                name: row[1],
                                color: row[2],
                                qty: Number(row[3]),
                            };
                            return colorama;
                        });
                        coloramasWithId = filteredColoramas === null || filteredColoramas === void 0 ? void 0 : filteredColoramas.filter(function (colorama) { return colorama.id !== null; });
                        return [2 /*return*/, coloramasWithId];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: err_1.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ColoramaModel.prototype.getColoramaById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var coloramas, colorama, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getColoramas()];
                    case 1:
                        coloramas = _a.sent();
                        colorama = coloramas.find(function (colorama) { return colorama.id === id; });
                        return [2 /*return*/, colorama];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ColoramaModel.prototype.createColoramas = function (colorama) {
        return __awaiter(this, void 0, void 0, function () {
            var coloramas, existingColorama, auth, range, values, resource, valueInputOption, response, newColorama, auth, appendRow, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.getColoramas()];
                    case 1:
                        coloramas = _a.sent();
                        existingColorama = coloramas === null || coloramas === void 0 ? void 0 : coloramas.find(function (c) { return c.id === colorama.id; });
                        if (!existingColorama) return [3 /*break*/, 4];
                        // Le colorama existe déjà, mettez à jour la quantité par exemple
                        existingColorama.qty += colorama.qty;
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 2:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        range = "Coloramas!A".concat(existingColorama.id + 1, ":E").concat(existingColorama.id + 1);
                        values = [
                            [
                                existingColorama.id,
                                existingColorama.name,
                                existingColorama.color,
                                existingColorama.qty,
                            ],
                        ];
                        resource = { values: values };
                        valueInputOption = "USER_ENTERED";
                        return [4 /*yield*/, auth.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: range,
                                resource: resource,
                                valueInputOption: valueInputOption,
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, existingColorama];
                    case 4:
                        newColorama = {
                            id: colorama.id,
                            name: colorama.name,
                            color: colorama.color,
                            qty: colorama.qty,
                        };
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 5:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, (auth === null || auth === void 0 ? void 0 : auth.spreadsheets.values.append({
                                spreadsheetId: this.spreadsheetId,
                                range: "Coloramas!A2:D",
                                valueInputOption: "USER_ENTERED",
                                resource: {
                                    values: [
                                        [
                                            newColorama.id,
                                            newColorama.name,
                                            newColorama.color,
                                            newColorama.qty,
                                        ],
                                    ],
                                },
                            }))];
                    case 6:
                        appendRow = _a.sent();
                        return [2 /*return*/, newColorama];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_3 = _a.sent();
                        return [2 /*return*/, { error: err_3.message }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ColoramaModel.prototype.updateColoramas = function (coloramasToUpdate) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var auth, range, getRows, rows, _i, coloramasToUpdate_1, colorama, indexToUpdate, i, updateRange, values, resource, valueInputOption, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        if (!coloramasToUpdate || !Array.isArray(coloramasToUpdate)) {
                            return [2 /*return*/, { error: "Invalid colorama objects" }];
                        }
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _b.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        range = "Coloramas!A:D";
                        return [4 /*yield*/, (auth === null || auth === void 0 ? void 0 : auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: range,
                            }))];
                    case 2:
                        getRows = _b.sent();
                        rows = getRows === null || getRows === void 0 ? void 0 : getRows.data.values;
                        _i = 0, coloramasToUpdate_1 = coloramasToUpdate;
                        _b.label = 3;
                    case 3:
                        if (!(_i < coloramasToUpdate_1.length)) return [3 /*break*/, 6];
                        colorama = coloramasToUpdate_1[_i];
                        if (!colorama || colorama.id === undefined) {
                            return [2 /*return*/, { error: "Invalid colorama object" }];
                        }
                        indexToUpdate = -1;
                        for (i = 0; i < (rows !== null && rows !== void 0 ? rows : []).length; i++) {
                            if (((_a = rows === null || rows === void 0 ? void 0 : rows[i]) === null || _a === void 0 ? void 0 : _a[0]) === colorama.id.toString()) {
                                indexToUpdate = i;
                                break;
                            }
                        }
                        if (indexToUpdate === -1) {
                            return [2 /*return*/, { error: "Colorama with ID ".concat(colorama.id, " not found") }];
                        }
                        updateRange = "Coloramas!B".concat(indexToUpdate + 1, ":D").concat(indexToUpdate + 1);
                        values = [[colorama.name, colorama.color, colorama.qty]];
                        resource = { values: values };
                        valueInputOption = "USER_ENTERED";
                        // Utiliser la méthode update pour mettre à jour la plage correcte
                        return [4 /*yield*/, auth.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: updateRange,
                                resource: resource,
                                valueInputOption: valueInputOption,
                            })];
                    case 4:
                        // Utiliser la méthode update pour mettre à jour la plage correcte
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, coloramasToUpdate];
                    case 7:
                        err_4 = _b.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return ColoramaModel;
}());
exports.default = ColoramaModel;
