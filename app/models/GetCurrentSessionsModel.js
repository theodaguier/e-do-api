const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class GetCurrentSessionsModel {
  constructor() {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
    this.columns = [
      "id",
      "name",
      "address",
      "phone",
      "siren",
      "reservations",
      "equipments",
      "createdAt",
    ];
  }

  async getCurrentSessions() {
    const sessions = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A2:H",
    });

    const rows = getRows.data.values;

    // Convertir les données de session en tableau d'objets
    rows.map((row, index) => {
      const session = {
        id: row[0],
        name: row[1],
        address: row[2],
        phone: row[3],
        siren: row[4],
        reservations: [],
        equipments: row[5].split(" ").map((equipment) => ({
          name: equipment,
          quantity: 1,
        })),
      };

      // Si ce n'est pas la première session, ajouter les objets de réservation de la session précédente au tableau `reservations` de la session actuelle
      if (index > 0) {
        session.reservations = session.reservations.concat(
          sessions[index - 1].reservations
        );
      }

      // Parcourir le tableau `reservation` de la session
      row[5].split(", ").forEach((reservation) => {
        // Diviser la réservation en deux parties : les heures et la machine
        const [hours, machine] = reservation.split(" ");

        // Convertir les heures en un entier
        const hoursInt = parseInt(hours);

        // Ajouter l'objet de réservation au tableau `reservations` de la session
        session.reservations.push({
          hours: hoursInt,
          machine: machine.trim(),
        });
      });
      sessions.push(session);
      index++;
      return session;
    });

    return sessions;
  }

  async getCurrentSessionsById(id) {
    const sessions = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A2:H",
    });

    const rows = getRows.data.values;

    // Convertir les données de session en tableau d'objets
    rows.map((row, index) => {
      const session = {
        id: row[0],
        name: row[1],
        address: row[2],
        phone: row[3],
        siren: row[4],
        reservations: [],
        equipments: row[5].split(" ").map((equipment) => ({
          name: equipment,
          quantity: 1,
        })),
      };

      // Si ce n'est pas la première session, ajouter les objets de réservation de la session précédente au tableau `reservations` de la session actuelle
      if (index > 0) {
        session.reservations = session.reservations.concat(
          sessions[index - 1].reservations
        );
      }

      // Parcourir le tableau `reservation` de la session
      row[5].split(", ").forEach((reservation) => {
        // Diviser la réservation en deux parties : les heures et la machine
        const [hours, machine] = reservation.split(" ");

        // Convertir les heures en un entier
        const hoursInt = parseInt(hours);

        // Ajouter l'objet de réservation au tableau `reservations` de la session
        session.reservations.push({
          hours: hoursInt,
          machine: machine.trim(),
        });
      });
      sessions.push(session);
      index++;
      return session;
    });

    const session = sessions.find((session) => session.id === id);

    return session;
  }
}

module.exports = GetCurrentSessionsModel;
