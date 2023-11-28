const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");
const { all } = require("axios");

class ColoramaModel {
  constructor(id, name, color, qty) {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
    this.id = id;
    this.name = name;
    this.color = color;
    this.qty = qty;
  }

  async getColoramas() {
    try {
      const coloramas = [];

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "Coloramas!A2:E",
      });

      const rows = getRows.data.values;

      const filteredColoramas = rows.slice(1).map((row, index) => {
        const colorama = {
          id: Number(row[0]),
          name: row[1],
          color: row[2],
          qty: Number(row[3]),
        };

        return colorama;
      });

      const coloramasWithId = filteredColoramas.filter(
        (colorama) => colorama.id !== null
      );

      return coloramasWithId;
    } catch (err) {
      return { error: err.message };
    }
  }

  // async getEquipmentById(id) {
  //   try {
  //     const equipments = await this.getEquipment();
  //     const equipment = equipments.find((equipment) => equipment.id === id);

  //     return equipment;
  //   } catch (err) {
  //     return { error: err.message };
  //   }
  // }

  // async getEquipmentByCategory(cat) {
  //   try {
  //     const equipments = await this.getEquipment();
  //     const equipmentsByCategory = equipments.filter(
  //       (equipment) => equipment.cat === cat
  //     );

  //     return equipmentsByCategory;
  //   } catch (err) {
  //     return { error: err.message };
  //   }
  // }

  async createColoramas(colorama) {
    try {
      const coloramas = await this.getColoramas();
      const newId = colorama.length + 1;

      const newColoramas = {
        id: newId,
        name: colorama.name,
        color: colorama.cat,
        qty: colorama.qty,
      };

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      // Recherche la première ligne vide
      // const firstEmptyRow = colorama.findIndex(
      //   (colorama) => colorama.name === ""
      // );

      // Ajoute une nouvelle ligne à la fin de la feuille de calcul
      const appendRow = await auth.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `Coloramas!A2:E`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              newColoramas.id,
              newColoramas.name,
              newColoramas.color,
              newColoramas.qty,
            ],
          ],
        },
      });

      return newColoramas;
    } catch (err) {
      return { error: err.message };
    }
  }
}

module.exports = ColoramaModel;
