const express = require("express");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const axios = require("axios");

const {
  getCurrentSessionsRoute,
  getEquipmentRoute,
  createCurrentSessionsRoute,
} = require("./app/routes");
const { CreateCurrentSessionsModel } = require("./app/models");
const { CreateCurrentSessionsController } = require("./app/controllers");
const { GetEquipmentController } = require("./app/controllers");

const app = express();
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api/get-current-sessions", getCurrentSessionsRoute);
app.use("/api/create-current-sessions", CreateCurrentSessionsController.post);
app.use("/api/get-equipments", getEquipmentRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

/**
 *
 * TEST
 */
// const requestData = {
//   newId: "1",
//   client: {
//     address: "123 Main St",
//     name: "John Doe",
//     phone: "555-555-5555",
//     siren: "123456789",
//   },
//   reservations: [
//     { hours: 1, machine: "Machine 1" },
//     { hours: 2, machine: "Machine 2" },
//   ],
//   equipments: [
//     { equipment: "Equipment 1", quantity: 2 },
//     { equipment: "Equipment 2", quantity: 3 },
//   ],
//   createdAt: "2022-01-01T00:00:00.000Z",
//   endAt: "2022-01-01T01:00:00.000Z",
// };

// const data = JSON.stringify(requestData);

// axios.post("http://localhost:3000/api/create-current-sessions", data, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
