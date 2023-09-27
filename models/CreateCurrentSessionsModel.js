const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class CreateCurrentSessionsModel {
  constructor() {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
  }

  async CreateCurrentSessionsModel() {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const writeRow = await auth.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["Hello", "World"]],
      },
    });

    return getRows.data.values;
  }
}

module.exports = CreateCurrentSessionsModel;
