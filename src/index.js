const express = require("express");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const axios = require("axios");

const { currentSession, equipment } = require("./routes");
const { CurrentSessionsModel } = require("./models");
const {
  CurrentSessionsController,
  EquipmentController,
  ClientController,
  ColoramaController,
} = require("./controllers");

const app = express();
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api/get-current-sessions", currentSession);
app.use("/api/get-current-sessions/:id", CurrentSessionsController.getById);
app.use("/api/create-current-sessions", CurrentSessionsController.post);
app.use("/api/create-equipment", EquipmentController.post);
app.use("/api/stop-session/:id", CurrentSessionsController.stopSession);
app.use("/api/get-equipments/all", EquipmentController.get);
app.use("/api/get-equipments/:cat", EquipmentController.getByCategory);
app.use(
  "/api/update-equipments/:cat",
  EquipmentController.updateEquipmentByCategory
);
app.use("/api/get-equipments/byId/:id", EquipmentController.getById);
app.use("/api/get-only-equipments", EquipmentController.getOnlyEquipment);
app.use("/api/get-clients/all", ClientController.get);
app.use("/api/get-clients/:id", ClientController.getById);
app.use("/api/create-clients", ClientController.post);
app.use("/api/update-current-session/:id", CurrentSessionsController.update);
app.use("/api/update-equipment/:id", CurrentSessionsController.updateEquipment);
app.use("/api/clients", ClientController.get);
app.use("/api/coloramas", ColoramaController.get);
app.use("/api/create-colorama", ColoramaController.post);
app.use("/api/update-colorama/", ColoramaController.updateColoramas);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
