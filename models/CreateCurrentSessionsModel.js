const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class CreateCurrentSessionsModel {
  constructor() {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
  }

  async createCurrentSession(sessionData) {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    // Utilisez les données de session pour créer une nouvelle entrée
    const sessionRow = [
      sessionData.client.name,
      sessionData.client.phone,
      sessionData.client.address,
      sessionData.client.siren,
      sessionData.createdAt,
      sessionData.endAt,
    ];

    const writeRow = await auth.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A:F",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [sessionRow],
      },
    });
    return writeRow.data.values;
  }
}

module.exports = CreateCurrentSessionsModel;
