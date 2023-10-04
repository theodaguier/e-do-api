const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class EquipmentModel {
  constructor(id, name, cat, price, qty) {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
    this.id = id;
    this.name = name;
    this.cat = cat;
    this.price = price;
    this.qty = qty;
  }

  async getEquipment() {
    try {
      const equipments = [];

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "Equipments!A2:E",
      });

      const rows = getRows.data.values;

      const filteredEquipments = rows.slice(1).map((row, index) => {
        const equipment = {
          id: Number(row[0]),
          name: row[1],
          cat: row[2],
          price: Number(row[3]),
          qty: Number(row[4]),
        };

        return equipment;
      });

      const equipmentsWithId = filteredEquipments.filter(
        (equipment) => equipment.id !== null
      );

      return equipmentsWithId;
    } catch (err) {
      return { error: err.message };
    }
  }

  async getEquipmentById(id) {
    try {
      const equipments = await this.getEquipment();
      const equipment = equipments.find((equipment) => equipment.id === id);

      return equipment;
    } catch (err) {
      return { error: err.message };
    }
  }

  async getEquipmentByCategory(cat) {
    try {
      const equipments = await this.getEquipment();
      const equipmentsByCategory = equipments.filter(
        (equipment) => equipment.cat === cat
      );

      return equipmentsByCategory;
    } catch (err) {
      return { error: err.message };
    }
  }

  async getOnlyEquipment() {
    try {
      const equipments = await this.getEquipment();

      return equipments;
    } catch (err) {
      return { error: err.message };
    }
  }

  async createEquipment(equipment) {
    try {
      const equipments = await this.getEquipment();
      const newId = equipments.length + 1;

      const newEquipment = {
        id: newId,
        name: equipment.name,
        cat: equipment.cat,
        price: equipment.price,
        qty: equipment.qty,
      };

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      // Recherche la première ligne vide
      const firstEmptyRow = equipments.findIndex(
        (equipment) => equipment.name === ""
      );

      // Ajoute une nouvelle ligne à la fin de la feuille de calcul
      const appendRow = await auth.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `Equipments!A${firstEmptyRow + 2}:E${firstEmptyRow + 2}`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              newEquipment.id,
              newEquipment.name,
              newEquipment.cat,
              newEquipment.price,
              newEquipment.qty,
            ],
          ],
        },
      });

      return newEquipment;
    } catch (err) {
      return { error: err.message };
    }
  }
}

module.exports = EquipmentModel;
