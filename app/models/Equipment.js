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

    return filteredEquipments;
  }

  async getEquipmentById(id) {
    const equipments = await this.getEquipment();
    const equipment = equipments.find((equipment) => equipment.id === id);

    return equipment;
  }

  async getEquipmentByCategory(cat) {
    const equipments = await this.getEquipment();
    const equipmentsByCategory = equipments.filter(
      (equipment) => equipment.cat === cat
    );

    return equipmentsByCategory;
  }

  async createEquipment(equipment) {
    const equipments = await this.getEquipment();
    const newId = equipments.length + 1;

    const newEquipment = {
      id: newId,
      name: equipment.name,
      cat: equipment.cat,
      price: equipment.price,
      qty: equipment.qty,
    };

    const newEquipments = equipments.concat(newEquipment);

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const updateSheet = await auth.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: "Equipments!A2:E",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: newEquipments.map((equipment) => [
          equipment.id,
          equipment.name,
          equipment.cat,
          equipment.price,
          equipment.qty,
        ]),
      },
    });

    return newEquipment;
  }
}

module.exports = EquipmentModel;
