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

    const sessionRow = [
      sessionData.client.name,
      sessionData.client.address,
      sessionData.client.phone,
      sessionData.client.siren,
      (sessionData.equipments || [])
        .map((equipment) => {
          return `${equipment.equipment} (${equipment.quantity})`;
        })
        .join(", "), // Update this line
      (sessionData.reservations || [])
        .map((reservation) => {
          return `${reservation.hours}h ${reservation.machine}`;
        })
        .join("/ "), // Update this line
      sessionData.createdAt,
      sessionData.endAt,
    ];

    console.log("reservations:", sessionData.reservations);
    console.log("equipments:", sessionData.equipments);

    const writeRow = await auth.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A:H",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [sessionRow],
      },
    });

    return writeRow.data.values;
  }
}

module.exports = CreateCurrentSessionsModel;
