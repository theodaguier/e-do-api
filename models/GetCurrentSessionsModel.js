const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class GetCurrentSessionsModel {
  constructor() {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
  }

  async getCurrentSessions() {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A:B",
    });

    return getRows.data.values;
  }
}

module.exports = GetCurrentSessionsModel;
