const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");

class GetCurrentSessionsModel {
  constructor() {
    this.googleSheetsAuth = new GoogleSheetsAuth();
    this.spreadsheetId = "1klunF-HoDO1PKMQ2Plx7VyHBf5EHuoxvF2J4KJEimE4";
    this.reservations = [];
    this.equipments = [];

    // Déclarer et initialiser la variable `columns`
    this.columns = [
      "name",
      "address",
      "phone",
      "siren",
      "equipments",
      "reservations",
      "createdAt",
    ];
  }

  async getCurrentSessions() {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A2:H",
    });

    const rows = getRows.data.values;

    // Convertir les données de session en tableau d'objets
    const sessions = rows.map((row) => {
      let session = {};

      // Assigner les noms de props de la première ligne de données
      session = Object.assign({}, session, rows[0]);

      for (const [index, value] of Object.entries(row)) {
        session[this.columns[index]] = value;
      }

      // Dissocier les réservations et les équipements
      if (session.reservations === undefined) {
        session.reservations = [];
      }

      if (Array.isArray(session.reservations)) {
        // Pour chaque réservation, vérifier si elle contient un séparateur `/`.
        // Si la réservation ne contient pas de séparateur `/`, créer une nouvelle réservation avec les heures seulement.
        // Sinon, créer une nouvelle réservation avec les heures et la machine.
        session.reservations = session.reservations.map((reservation) => {
          const [hours, machine = null] = reservation.split("/");
          return { hours, machine };
        });
      }

      if (session.equipments === undefined) {
        session.equipments = [];
      }

      if (Array.isArray(session.equipments)) {
        session.equipments = session.equipments.map((equipment) => {
          const [name, quantity] = equipment.split(/\s\(\d+\)/);
          return { name, quantity };
        });
      }

      return session;
    });

    return sessions;
  }

  dissociateReservation(reservation) {
    // Si la réservation ne contient pas de séparateur /, retourner la réservation intacte.
    if (!reservation.includes("/")) {
      return { hours: reservation, machine: null };
    }

    // Diviser la réservation en deux parties : les heures et la machine.
    const [hours, machine] = reservation.split("/");

    // Retourner les heures et la machine.
    return { hours, machine };
  }
}

module.exports = GetCurrentSessionsModel;
