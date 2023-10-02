const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class ClientModel {
  constructor(id, name, address, brand, siren, phone, email) {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
    this.id = id;
    this.name = name;
    this.address = address;
    this.brand = brand;
    this.siren = siren;
    this.phone = phone;
    this.email = email;
  }

  async getClients() {
    const clients = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "Clients!A2:G",
    });

    const rows = getRows.data.values;

    const filteredClients = rows?.slice(1).map((row, index) => {
      const client = {
        id: Number(row[0]),
        name: row[1],
        address: row[2],
        brand: row[3],
        siren: Number(row[4]),
        phone: Number(row[5]),
        email: row[6],
      };

      return client;
    });

    return filteredClients;
  }

  async getClientsById(id) {
    const clients = await this.getClients();
    const client = clients.find((client) => client.id === id);

    return client;
  }

  async createClient(client) {
    const clients = await this.getClients();

    const newId = clients[clients.length - 1].id + 1;

    const newClient = {
      id: newId,
      name: client.name,
      address: client.address,
      brand: client.brand,
      siren: client.siren,
      phone: client.phone,
      email: client.email,
    };

    const newClients = [...clients, newClient];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const updateSheet = await auth.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: "Clients!A2:G",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: newClients.map((client) => [
          client.id,
          client.name,
          client.address,
          client.brand,
          client.siren,
          client.phone,
          client.email,
        ]),
      },
    });

    return newClient;
  }
}

module.exports = ClientModel;
