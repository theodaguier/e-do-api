import GoogleSheetsAuth from "../services/auth";
import { v4 as uuidv4 } from "uuid";
import { Client } from "../types/def.type";

class ClientModel {
  static createClient(client: Client) {
    throw new Error("Method not implemented.");
  }
  static getClientById(id: string) {
    throw new Error("Method not implemented.");
  }
  static getClients() {
    throw new Error("Method not implemented.");
  }
  googleSheetsAuth: GoogleSheetsAuth;
  spreadsheetId: string;
  id: string;
  name: string;
  address: string;
  brand: string;
  siren: string;
  phone: string;
  email: string;

  constructor({ id, name, address, brand, siren, phone, email }: Client) {
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

  async getClients(): Promise<Client[]> {
    const clients: Client[] = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth?.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "Clients!A2:G",
    });

    const rows = getRows?.data.values;

    if (rows) {
      rows.slice(1).forEach((row: any[]) => {
        const client: Client = {
          id: uuidv4(),
          name: row[0],
          address: row[1],
          brand: row[2],
          siren: row[3],
          phone: row[4],
          email: row[5],
        };
        clients.push(client);
      });
    }

    return clients;
  }

  async getClientById(id: string): Promise<Client | undefined> {
    const clients = await this.getClients();
    const client = clients.find((client) => client.id === id);

    return client;
  }

  async createClient(client: Client): Promise<Client> {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const values = [
      [
        client.name,
        client.address,
        client.brand,
        client.siren,
        client.phone,
        client.email,
      ],
    ];

    if (auth) {
      const resource = {
        values,
      };

      const response = await auth.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: "Clients!A2:G",
        valueInputOption: "USER_ENTERED",
        requestBody: resource,
      });
    }

    return client;
  }

  async updateClient(client: Client): Promise<Client> {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const values = [
      [
        client.name,
        client.address,
        client.brand,
        client.siren,
        client.phone,
        client.email,
      ],
    ];

    if (auth) {
      const resource = {
        values,
      };

      const response = await auth.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `Clients!A${client.id + 1}:G${client.id + 1}`,
        valueInputOption: "USER_ENTERED",
        requestBody: resource,
      });
    }

    return client;
  }
}

export default ClientModel;
