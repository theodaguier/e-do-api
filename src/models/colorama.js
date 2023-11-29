const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

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
        range: "Coloramas!A2:D",
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

      // Vérifier si le colorama existe déjà dans la liste
      const existingColorama = coloramas.find((c) => c.id === colorama.id);

      if (existingColorama) {
        // Le colorama existe déjà, mettez à jour la quantité par exemple
        existingColorama.qty += colorama.qty;

        await this.googleSheetsAuth.authenticate();
        const auth = this.googleSheetsAuth.getGoogleSheets();

        // Mettre à jour la valeur dans la feuille de calcul
        const range = `Coloramas!A${existingColorama.id + 1}:E${
          existingColorama.id + 1
        }`;
        const values = [
          [
            existingColorama.id,
            existingColorama.name,
            existingColorama.color,
            existingColorama.qty,
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

        return existingColorama;
      } else {
        // Le colorama n'existe pas encore, ajoutez-le
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
          range: `Coloramas!A2:D`,
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
      }
    } catch (err) {
      return { error: err.message };
    }
  }

  async updateColoramas(coloramasToUpdate) {
    try {
      if (!coloramasToUpdate || !Array.isArray(coloramasToUpdate)) {
        return { error: "Invalid colorama objects" };
      }

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      const range = `Coloramas!A:D`;
      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = getRows.data.values;

      // Mettre à jour chaque colorama du tableau
      for (const colorama of coloramasToUpdate) {
        if (!colorama || colorama.id === undefined) {
          return { error: "Invalid colorama object" };
        }

        // Recherche de l'index de la ligne à mettre à jour
        let indexToUpdate = -1;

        for (let i = 0; i < rows.length; i++) {
          if (rows[i][0] === colorama.id.toString()) {
            indexToUpdate = i;
            break;
          }
        }

        if (indexToUpdate === -1) {
          return { error: `Colorama with ID ${colorama.id} not found` };
        }

        // Construire la plage correcte en utilisant les lettres des colonnes
        const updateRange = `Coloramas!B${indexToUpdate + 1}:D${
          indexToUpdate + 1
        }`;
        const values = [[colorama.name, colorama.color, colorama.qty]];
        const resource = { values };
        const valueInputOption = "USER_ENTERED";

        // Utiliser la méthode update pour mettre à jour la plage correcte
        await auth.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: updateRange,
          resource,
          valueInputOption,
        });
      }

      return coloramasToUpdate;
    } catch (err) {
      return { error: err.message };
    }
  }
}

module.exports = ColoramaModel;
