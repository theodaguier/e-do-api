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
var uuid_1 = require("uuid");
var ClientModel = /** @class */ (function () {
    function ClientModel(_a) {
        var id = _a.id, name = _a.name, address = _a.address, brand = _a.brand, siren = _a.siren, phone = _a.phone, email = _a.email;
        this.googleSheetsAuth = new auth_1.default();
        this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
        this.id = id;
        this.name = name;
        this.address = address;
        this.brand = brand;
        this.siren = siren;
        this.phone = phone;
        this.email = email;
    }
    ClientModel.createClient = function (client) {
        throw new Error("Method not implemented.");
    };
    ClientModel.getClientById = function (id) {
        throw new Error("Method not implemented.");
    };
    ClientModel.getClients = function () {
        throw new Error("Method not implemented.");
    };
    ClientModel.prototype.getClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clients, auth, getRows, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clients = [];
                        return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        return [4 /*yield*/, (auth === null || auth === void 0 ? void 0 : auth.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: "Clients!A2:G",
                            }))];
                    case 2:
                        getRows = _a.sent();
                        rows = getRows === null || getRows === void 0 ? void 0 : getRows.data.values;
                        if (rows) {
                            rows.slice(1).forEach(function (row) {
                                var client = {
                                    id: (0, uuid_1.v4)(),
                                    name: row[0],
                                    address: row[1],
                                    brand: row[2],
                                    siren: row[3],
                                    phone: row[4],
                                    email: row[5],
                                };
                                clients.push(client);
                            });
                        }
                        return [2 /*return*/, clients];
                }
            });
        });
    };
    ClientModel.prototype.getClientById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var clients, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClients()];
                    case 1:
                        clients = _a.sent();
                        client = clients.find(function (client) { return client.id === id; });
                        return [2 /*return*/, client];
                }
            });
        });
    };
    ClientModel.prototype.createClient = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, values, resource, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        values = [
                            [
                                client.name,
                                client.address,
                                client.brand,
                                client.siren,
                                client.phone,
                                client.email,
                            ],
                        ];
                        if (!auth) return [3 /*break*/, 3];
                        resource = {
                            values: values,
                        };
                        return [4 /*yield*/, auth.spreadsheets.values.append({
                                spreadsheetId: this.spreadsheetId,
                                range: "Clients!A2:G",
                                valueInputOption: "USER_ENTERED",
                                requestBody: resource,
                            })];
                    case 2:
                        response = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, client];
                }
            });
        });
    };
    ClientModel.prototype.updateClient = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, values, resource, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.googleSheetsAuth.authenticate()];
                    case 1:
                        _a.sent();
                        auth = this.googleSheetsAuth.getGoogleSheets();
                        values = [
                            [
                                client.name,
                                client.address,
                                client.brand,
                                client.siren,
                                client.phone,
                                client.email,
                            ],
                        ];
                        if (!auth) return [3 /*break*/, 3];
                        resource = {
                            values: values,
                        };
                        return [4 /*yield*/, auth.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: "Clients!A".concat(client.id + 1, ":G").concat(client.id + 1),
                                valueInputOption: "USER_ENTERED",
                                requestBody: resource,
                            })];
                    case 2:
                        response = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, client];
                }
            });
        });
    };
    return ClientModel;
}());
exports.default = ClientModel;
