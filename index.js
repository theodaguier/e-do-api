const express = require("express");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const axios = require("axios");

const {
  getCurrentSessionsRoute,
  createCurrentSessionsRoute,
} = require("./routes");
const { CreateCurrentSessionsModel } = require("./models");
const { CreateCurrentSessionsController } = require("./controllers");

const app = express();
dotenv.config();

// app.get("/", async (req, res) => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: "credentials.json",
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
//   });

//   const client = await auth.getClient();

//   const googleSheets = google.sheets({ version: "v4", auth: client });

//   const spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";

//   const metaData = await googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId,
//   });

//   // Read data from spreadsheet

//   const getRows = await googleSheets.spreadsheets.values.get({
//     auth,
//     spreadsheetId,
//     range: "Sheet1",
//   });

//   // write row(s) to spreadsheet

//   await googleSheets.spreadsheets.values.append({
//     auth,
//     spreadsheetId,
//     range: "Sheet1!A:B",
//     valueInputOption: "USER_ENTERED",
//     resource: {
//       values: [["Hello", "World"]],
//     },
//   });

//   res.send(getRows.data);
// });

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api/get-current-sessions", getCurrentSessionsRoute);
app.use("/api/create-current-sessions", CreateCurrentSessionsController.post);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

/**
 *
 * TEST
 */
const requestData = {
  client: {
    address: "123 Main St",
    name: "John Doe",
    phone: "555-555-5555",
    siren: "123456789",
  },
  reservation: [
    { hours: "1", machine: "Machine 1" },
    { hours: "2", machine: "Machine 2" },
  ],
  equipments: [{ equipment: "Equipment 1", quantity: 2 }],
  createdAt: "2022-01-01T00:00:00.000Z",
  endAt: "2022-01-01T01:00:00.000Z",
};

const data = JSON.stringify(requestData);

axios.post("http://localhost:3000/api/create-current-sessions", data, {
  headers: {
    "Content-Type": "application/json",
  },
});
