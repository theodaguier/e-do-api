// const express = require("express");
// const dotenv = require("dotenv");
// const { google } = require("googleapis");

// const getCurrentSessionsRoute = require("./routes/GetCurrentSessionsRoute");
// const createCurrentSessionsRoute = require("./routes/CreateCurrentSessionsRoute");

// const app = express();
// dotenv.config();

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

// app.use("/get-current-sessions", getCurrentSessionsRoute);

// app.listen(process.env.PORT, () => {
//   console.log(`Server listening on port ${process.env.PORT}`);
// });
