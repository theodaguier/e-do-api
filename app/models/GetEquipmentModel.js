const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class GetEquipmentModel {
  constructor() {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
  }

  async getEquipment() {
    const equipments = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "Equipments!A2:B",
    });

    const rows = getRows.data.values;

    // Convertir les données d'équipement en tableau d'objets
    rows.map((row, index) => {
      const equipment = {
        id: row[0],
        name: row[1],
        price: row[2],
        qty: row[3],
      };

      equipments.push(equipment);
    });

    return equipments;
  }
}

module.exports = GetEquipmentModel;
