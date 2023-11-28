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

  async getColoramaById(id) {
    try {
      const coloramas = await this.getColoramas();
      const colorama = coloramas.find((colorama) => colorama.id === id);

      return colorama;
    } catch (err) {
      return { error: err.message };
    }
  }

  async createColoramas(colorama) {
    try {
      const coloramas = await this.getColoramas();

      const newColorama = {
        id: colorama.id,
        name: colorama.name,
        color: colorama.color,
        qty: colorama.qty,
      };

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      // Ajoute une nouvelle ligne à la fin de la feuille de calcul
      const appendRow = await auth.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `Coloramas!A2:E`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              newColorama.id,
              newColorama.name,
              newColorama.color,
              newColorama.qty,
            ],
          ],
        },
      });

      return newColorama;
    } catch (err) {
      return { error: err.message };
    }
  }

  async updateColoramas(colorama) {
    console.log("colorama:", colorama);

    try {
      const updatedColoramas = colorama.map((currentColorama) => {
        if (currentColorama.id)
          // Mettre à jour seulement les propriétés nécessaires
          return {
            id: currentColorama.id,
            name: currentColorama.name,
            color: currentColorama.color,
            qty: currentColorama.qty,
          };
      });

      console.log("updatedColoramas:", updatedColoramas);

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      for (const updatedColorama of updatedColoramas) {
        // Trouver l'index de l'équipement dans la liste complète
        const indexToUpdate = colorama.findIndex(
          (col) => col.id === updatedColorama.id
        );

        // Mettre à jour les propriétés modifiables
        if (indexToUpdate !== -1) {
          colorama[indexToUpdate].id = updatedColorama.id;
          colorama[indexToUpdate].name = updatedColorama.name;
          colorama[indexToUpdate].color = updatedColorama.color;
          colorama[indexToUpdate].qty = updatedColorama.qty;

          // Mettre à jour les valeurs dans la feuille de calcul
          const range = `Coloramas!A${indexToUpdate + 2}:E${indexToUpdate + 2}`;
          const values = [
            [
              colorama[indexToUpdate].id,
              colorama[indexToUpdate].name,
              colorama[indexToUpdate].color,
              colorama[indexToUpdate].qty,
            ],
          ];
          const resource = { values };
          const valueInputOption = "USER_ENTERED";

          await auth.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range,
            resource,
            valueInputOption,
          });
        }
      }

      // Afficher les lignes mises à jour dans la console
      console.log("Updated rows:", updatedColoramas);

      return updatedColoramas;
    } catch (err) {
      console.error("Error updating coloramas:", err);
      return { error: err.message };
    }
  }
}

module.exports = ColoramaModel;
