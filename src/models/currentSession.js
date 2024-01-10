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
      "notes",
      "createdBy",
      "lastUpdatedBy",
      "status",
      "createdAt",
      "endAt",
      "updatedAt",
      "vertical",
      "horizontal",
      "eclipse",
      "live",
      "cyclorama",
      "verticalStop",
      "horizontalStop",
      "eclipseStop",
      "liveStop",
      "cycloramaStop",
    ];
  }

  async getCurrentSessions() {
    const sessions = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A3:X",
    });

    const rows = getRows.data.values;

    if (rows) {
      rows.map((row, index) => {
        const session = {
          id: row[0],
          name: row[1],
          address: row[2],
          phone: row[3],
          siren: row[4],
          reservations: [],
          equipments: row[6].split(" ").map((equipment) => ({
            name: equipment,
            quantity: 1,
          })),
          notes: row[7],
          createdBy: row[8],
          lastUpdatedBy: row[9],
          status: row[10],
          createdAt: row[11],
          endAt: row[12],
          updatedAt: row[13],
          vertical: row[14],
          horizontal: row[15],
          eclipse: row[16],
          live: row[17],
          cyclorama: row[18],
          verticalStop: row[19],
          horizontalStop: row[20],
          eclipseStop: row[21],
          liveStop: row[22],
          cycloramaStop: row[23],
        };

        // Si ce n'est pas la première session, ajouter les objets de réservation de la session précédente au tableau `reservations` de la session actuelle
        // if (index > 0) {
        //   session.reservations = session.reservations.concat(
        //     sessions[index - 1].reservations
        //   );
        // }

        // Parcourir le tableau `reservation` de la session
        row[5].split(", ").forEach((reservation) => {
          // Diviser la réservation en deux parties : les heures et la machine
          const [hours, machine] = reservation.split(" ");

          // Convertir les heures en un entier
          const hoursInt = parseInt(hours);

          // Ajouter l'objet de réservation au tableau `reservations` de la session
          session.reservations.push({
            hours: hoursInt,
            machine: machine,
          });
        });

        sessions.push(session);

        return session;
      });
    }

    return sessions;
  }

  async getCurrentSessionsById(id) {
    const sessions = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets();

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A3:X",
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
        equipments: [],
        notes: row[7],
        createdBy: row[8],
        lastUpdatedBy: row[9],
        status: row[10],
        createdAt: row[11],
        endAt: row[12],
        updatedAt: row[13],
        vertical: row[14],
        horizontal: row[15],
        eclipse: row[16],
        live: row[17],
        cyclorama: row[18],
        verticalStop: row[19],
        horizontalStop: row[20],
        eclipseStop: row[21],
        liveStop: row[22],
        cycloramaStop: row[23],
      };

      // Parcourir le tableau `reservation` de la session
      row[5].split(", ").forEach((reservation) => {
        // Diviser la réservation en deux parties : les heures et la machine
        const [hours, machine] = reservation.split(" ");

        // Convertir les heures en un entier
        const hoursInt = parseInt(hours);

        // Ajouter l'objet de réservation au tableau `reservations` de la session
        session.reservations.push({
          hours: hoursInt,
          machine: machine,
        });
      });

      row[6].split(", ").forEach((equipment) => {
        // Diviser l'équipement en deux parties : le nom et la quantité
        const [name, quantity] = equipment.split(" (");

        // Convertir la quantité en un entier
        const quantityInt = parseInt(quantity);

        // Ajouter l'objet d'équipement au tableau `equipments` de la session
        session.equipments.push({
          name,
          quantity: quantityInt,
        });
      });

      sessions.push(session);
      index++;
      return session;
    });

    // Filtrer les sessions par ID
    const filteredSessions = sessions.filter((session) => session.id === id);

    // S'il n'y a pas de session correspondante, renvoyez un objet vide
    if (!filteredSessions.length) {
      return {};
    }

    // Renvoie la session correspondante
    return filteredSessions[0];
  }

  async updateCurrentSession(id, sessionData) {
    try {
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "CurrentSessions!A2:X",
      });

      const rows = getRows.data.values;

      // Trouve la ligne de la session à mettre à jour
      const sessionIndex = rows.findIndex((row) => row[0] === id);

      const sessionRow = rows.find((row) => row[0] === id);

      // Vérifie si la session existe
      if (!sessionRow) {
        throw new Error("Session does not exist");
      }

      // Analysez la valeur actuelle de la cellule des équipements et convertissez-la en un tableau d'équipements existants
      const existingEquipments = sessionRow[6]
        ? sessionRow[6].split(", ").map((item) => {
            const [equipment, quantity] = item.split(" (");
            return {
              name: equipment,
              quantity: parseInt(quantity),
            };
          })
        : [];

      // Parcourez le tableau existant
      if (sessionData.equipments) {
        for (const equipmentData of sessionData.equipments) {
          const existingEquipment = existingEquipments.find(
            (item) => item.name === equipmentData.name
          );

          if (existingEquipment) {
            // Si vous trouvez un équipement avec le même nom, ajoutez simplement la nouvelle quantité à la quantité existante
            existingEquipment.quantity += equipmentData.quantity;
          } else {
            // Sinon, ajoutez le nouvel équipement à la liste existante
            existingEquipments.push(equipmentData);
          }
        }
      }

      // Mettez à jour la cellule des équipements avec la liste mise à jour
      sessionRow[6] = existingEquipments
        .map((equipment) => `${equipment.name} (${equipment.quantity})`)
        .join(", ");

      // Vérifiez si sessionData.reservations est défini avant de le mettre à jour
      if (sessionData.reservations !== undefined) {
        sessionRow[5] = sessionData.reservations;
      }

      // Vérifiez si sessionData.status est défini avant de le mettre à jour
      if (sessionData.status !== undefined) {
        sessionRow[10] = sessionData.status;
      }

      // Récupère l'index de la ligne
      const sessionRowIndex = rows.indexOf(sessionRow);

      // Met à jour la ligne dans Google Sheets
      const writeRow = await auth.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `CurrentSessions!A${sessionRowIndex + 2}:X${
          sessionRowIndex + 2
        }`,
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

  async updateSessionEquipment(id, sessionData) {
    try {
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "CurrentSessions!A3:S",
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
        range: `CurrentSessions!A3${sessionRow}:X${sessionRow}`,
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

    sessionData.status = "pending";

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
      sessionData.notes,
      sessionData.createdBy,
      sessionData.lastUpdatedBy,
      sessionData.status,
      sessionData.createdAt,
      sessionData.endAt,
      sessionData.updatedAt,
      sessionData.vertical,
      sessionData.horizontal,
      sessionData.eclipse,
      sessionData.live,
      sessionData.cyclorama,
      sessionData.verticalStop,
      sessionData.horizontalStop,
      sessionData.eclipseStop,
      sessionData.liveStop,
      sessionData.cycloramaStop,
    ];

    const writeRow = await auth.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A3:X",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [sessionRow],
      },
    });

    return writeRow.data.values;
  }

  async stopSession(id) {
    try {
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets();

      // Récupérer les données de la feuille CurrentSessions
      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "CurrentSessions!A3:X",
      });

      const currentSessionsRows = getRows.data.values;

      // Trouver la ligne de la session à arrêter
      const sessionRow = currentSessionsRows.find((row) => row[0] === id);

      // Vérifier si la session existe
      if (!sessionRow) {
        throw new Error("Session does not exist");
      }

      // Supprimer la session de la feuille CurrentSessions
      const sessions = response.data.values || [];
      const sessionIndex = sessions.findIndex(
        (session) => session[0] === sessionId
      );

      // Si la session est trouvée, la supprimer

      if (sessionIndex > -1) {
        sessions.splice(sessionIndex, 1);

        await auth.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `CurrentSessions!A${sessionIndex + 3}:X`,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: sessions,
          },
        });
      }

      // Ajouter la session à la feuille ArchivedSessions
      const archivedSessionsRow = [...sessionRow, ""];
      await auth.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: "ArchivedSessions!A2:X",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [archivedSessionsRow],
        },
      });

      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  }
}

module.exports = CurrentSessionsModel;
