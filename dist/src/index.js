"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var current_session_controller_1 = __importDefault(require("./controllers/current-session.controller"));
var equipment_controller_1 = __importDefault(require("./controllers/equipment.controller"));
var client_controller_1 = __importDefault(require("./controllers/client.controller"));
var colorama_controller_1 = __importDefault(require("./controllers/colorama.controller"));
var app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use("/api/get-current-sessions", current_session_controller_1.default.get);
app.use("/api/get-current-sessions/:id", current_session_controller_1.default.getById);
app.use("/api/create-current-sessions", current_session_controller_1.default.post);
app.use("/api/create-equipment", equipment_controller_1.default.post);
app.use("/api/stop-session/:id", current_session_controller_1.default.stopSession);
app.use("/api/get-equipments/all", equipment_controller_1.default.get);
app.use("/api/get-equipments/:cat", equipment_controller_1.default.getByCategory);
// app.use(
//   "/api/update-equipments/:cat",
//   EquipmentController.updateEquipmentByCategory
// );
app.use("/api/get-equipments/byId/:id", equipment_controller_1.default.getById);
app.use("/api/get-only-equipments", equipment_controller_1.default.getOnlyEquipment);
app.use("/api/get-clients/all", client_controller_1.default.get);
app.use("/api/get-clients/:id", client_controller_1.default.getById);
app.use("/api/create-clients", client_controller_1.default.post);
app.use("/api/update-current-session/:id", current_session_controller_1.default.update);
// app.use("/api/update-equipment/:id", CurrentSessionsController.updateEquipment);
app.use("/api/clients", client_controller_1.default.get);
app.use("/api/coloramas", colorama_controller_1.default.get);
app.use("/api/create-colorama", colorama_controller_1.default.post);
app.use("/api/update-colorama/", colorama_controller_1.default.updateColoramas);
app.listen(process.env.PORT, function () {
    console.log("\uD83D\uDCAB Server listening on port ".concat(process.env.PORT, " \uD83D\uDCAB"));
});
