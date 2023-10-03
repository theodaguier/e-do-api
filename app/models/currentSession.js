const { google } = require("googleapis");
const { GoogleSheetsAuth } = require("../services");
const { v4: uuidv4 } = require("uuid");

class CurrentSessionsModel {
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

  async updateCurrentSession(id, sessionData) {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A2:H",
    });

    const rows = getRows.data.values;

    // Trouve la ligne de la session à mettre à jour
    const sessionRow = rows.find((row) => row[0] === id);

    // Vérifie si la session existe
    if (!sessionRow) {
      throw new Error("Session does not exist");
    }

    // Met à jour la colonne des équipements, attention si la session a déjà des équipements de ne pas les supprimer !
    sessionRow[6] = sessionData.equipments
      .map((equipment) => `${equipment.equipment} (${equipment.quantity})`)
      .join(", ");

    // Récupère l'index de la ligne
    const sessionRowIndex = rows.indexOf(sessionRow);

    // Met à jour la ligne dans Google Sheets
    const writeRow = await auth.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `CurrentSessions!A${sessionRowIndex + 2}:H${sessionRowIndex + 2}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [sessionRow],
      },
    });

    return writeRow.data.values;
  }

  async updateSessionEquipment(id, sessionData) {
    try {
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "CurrentSessions!A:H",
      });

      const rows = getRows.data.values;

      // Trouve la ligne de la session à mettre à jour
      const sessionRow = rows.filter((row) => row[0] === id)[0];

      // Vérifie si la session existe
      if (!sessionRow) {
        throw new Error("Session does not exist");
      }

      // Mettez à jour la colonne des équipements
      sessionRow[6] = sessionData.equipments
        .map(
          (equipment) => `${equipment.equipment} (${equipment.quantity || 0})`
        )
        .join(", ");

      const writeRow = await auth.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `CurrentSessions!A${sessionRow}:H${sessionRow}`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [sessionRow],
        },
      });

      return writeRow.data.values;
    } catch (err) {
      return { error: err.message };
    }
  }

  async createCurrentSession(sessionData) {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const sessionRow = [
      sessionData.id,
      sessionData.client.name,
      sessionData.client.address,
      sessionData.client.phone,
      sessionData.client.siren,
      (sessionData.reservations || [])
        .map((reservation) => {
          return `${reservation.hours}h ${reservation.machine}`;
        })
        .join(", "),
      (sessionData.equipments || [])
        .map((equipment) => {
          return `${equipment.equipment} (${equipment.quantity})`;
        })
        .join(", "),
      sessionData.createdAt,
      sessionData.endAt,
    ];

    console.log("reservations:", sessionData.reservations);
    console.log("equipments:", sessionData.equipments);

    const writeRow = await auth.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A:H",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [sessionRow],
      },
    });

    return writeRow.data.values;
  }
}

module.exports = CurrentSessionsModel;
