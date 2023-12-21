// @ts-nocheck
import { google } from "googleapis";

import GoogleSheetsAuth from "../services/auth";
import { v4 as uuidv4 } from "uuid";
import { Reservation, Session } from "../types/def.type";
import { Response } from "express";

class CurrentSessionsModel {
  private googleSheetsAuth: GoogleSheetsAuth;
  private spreadsheetId: string;
  private columns: string[];

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
    ];
  }

  async get(): Promise<Session[]> {
    const sessions: Session[] = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets() as any;

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A3:N",
    });

    const rows = getRows.data.values;

    if (rows) {
      rows.map((row: any, index: number) => {
        const session: Session = {
          id: row[0],
          name: row[1],
          address: row[2],
          phone: row[3],
          siren: row[4],
          reservations: [] as Reservation[],
          equipments: row[6].split(" ").map((equipment: any) => ({
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
        };

        if (index > 0) {
          session.reservations = session.reservations.concat(
            sessions[index - 1].reservations
          );
        }

        row[5].split(", ").forEach((reservation: string) => {
          const [hours, machine] = reservation.split(" ");
          const hoursInt = parseInt(hours);

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

  async getById(id: any): Promise<Session | {}> {
    const sessions: Session[] = [];

    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets() as any;

    const getRows = await auth.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A3:N",
    });

    const rows = getRows.data.values;

    rows?.map((row: any, index: number) => {
      const session: Session = {
        id: row[0],
        name: row[1],
        address: row[2],
        phone: row[3],
        siren: row[4],
        reservations: [] as Reservation[],
        equipments: [] as any[],
        notes: row[7],
        createdBy: row[8],
        lastUpdatedBy: row[9],
        status: row[10],
        createdAt: row[11],
        endAt: row[12],
        updatedAt: row[13],
      };

      row[5].split(", ").forEach((reservation: string) => {
        const [hours, machine] = reservation.split(" ");
        const hoursInt = parseInt(hours);

        session.reservations.push({
          hours: hoursInt,
          machine: machine,
        });
      });

      row[6].split(", ").forEach((equipment: string) => {
        const [name, quantity] = equipment.split(" (");
        const quantityInt = parseInt(quantity);

        session.equipments.push({
          name,
          quantity: quantityInt,
        });
      });

      sessions.push(session);

      return session;
    });

    const filteredSessions = sessions.filter((session) => session.id === id);

    if (!filteredSessions.length) {
      return {};
    }

    return filteredSessions[0];
  }

  async update(
    id: any,
    sessionData: { equipments: any; reservations: any[]; status: string }
  ): Promise<any> {
    try {
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets() as any;

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "CurrentSessions!A2:N",
      });

      const rows = getRows.data.values;

      const sessionIndex = rows?.findIndex((row: any) => row[0] === id);

      const sessionRow = rows?.find((row: any) => row[0] === id);

      if (!sessionRow) {
        throw new Error("Session does not exist");
      }

      const existingEquipments = sessionRow[6]
        ? sessionRow[6].split(", ").map((item: any) => {
            const [equipment, quantity] = item.split(" (");
            return {
              name: equipment,
              quantity: parseInt(quantity),
            };
          })
        : [];

      if (sessionData.equipments) {
        for (const equipmentData of sessionData.equipments) {
          const existingEquipment = existingEquipments.find(
            (item: any) => item.name === equipmentData.name
          );

          if (existingEquipment) {
            existingEquipment.quantity += equipmentData.quantity;
          } else {
            existingEquipments.push(equipmentData);
          }
        }
      }

      sessionRow[6] = existingEquipments
        .map((equipment: any) => `${equipment.name} (${equipment.quantity})`)
        .join(", ");

      if (sessionData.reservations !== undefined) {
        sessionRow[5] = sessionData.reservations
          .map((reservation) => `${reservation.hours} ${reservation.machine}`)
          .join(", ");
      }

      if (sessionData.status !== undefined) {
        sessionRow[10] = sessionData.status;
      }

      const sessionRowIndex = rows?.indexOf(sessionRow);

      const writeRow = await auth.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `CurrentSessions!A${sessionRowIndex + 2}:N${
          sessionRowIndex + 2
        }`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [sessionRow],
        },
      });

      return writeRow.data.values;
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  async updateSessionEquipment(
    id: number,
    sessionData: { equipments: any }
  ): Promise<any> {
    try {
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets() as any;

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "CurrentSessions!A3:J",
      });

      const rows = getRows.data.values;

      const sessionRow = rows?.filter((row: any) => row[0] === id)[0];

      if (!sessionRow) {
        throw new Error("Session does not exist");
      }

      sessionRow[6] = sessionData.equipments
        .map(
          (equipment: any) => `${equipment.name} (${equipment.quantity || 0})`
        )
        .join(", ");

      const writeRow = await auth.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `CurrentSessions!A3${sessionRow}:J${sessionRow}`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [sessionRow],
        },
      });

      return writeRow.data.values;
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  async createCurrentSession(sessionData: Session): Promise<any> {
    await this.googleSheetsAuth.authenticate();
    const auth = this.googleSheetsAuth.getGoogleSheets() as any;

    sessionData.status = "pending";

    const sessionRow = [
      sessionData.id,
      sessionData.name,
      sessionData.address,
      sessionData.phone,
      sessionData.siren,
      (sessionData.reservations as Reservation[])
        .map((reservation: Reservation) => {
          return `${reservation.hours}h ${reservation.machine}`;
        })
        .join(", "),
      (sessionData.equipments || [])
        .map((equipment) => {
          return `${equipment.name} (${equipment.quantity})`;
        })
        .join(", "),
      sessionData.notes,
      sessionData.createdBy,
      sessionData.lastUpdatedBy,
      sessionData.status,
      sessionData.createdAt,
      sessionData.endAt,
      sessionData.updatedAt,
    ];

    const writeRow = await auth.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "CurrentSessions!A3:N",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [sessionRow],
      },
    });

    return writeRow.data.values;
  }

  async stop(id: number): Promise<any> {
    try {
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets() as any;

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "CurrentSessions!A3:J",
      });

      const currentSessionsRows = getRows.data ? getRows.data.values : [];

      const sessionRow = currentSessionsRows.find((row: any) => row[0] === id);

      if (!sessionRow) {
        throw new Error("Session does not exist");
      }

      const sessionIndex = currentSessionsRows.findIndex(
        (session: any) => session[0] === id
      );

      if (sessionIndex > -1) {
        currentSessionsRows.splice(sessionIndex, 1);

        await auth.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `CurrentSessions!A${sessionIndex + 3}:J`,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: currentSessionsRows,
          },
        });
      }

      const archivedSessionsRow = [...sessionRow, ""];
      await auth.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: "ArchivedSessions!A2:J",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [archivedSessionsRow],
        },
      });

      return { success: true };
    } catch (err) {
      return { error: (err as Error).message };
    }
  }
}

export default CurrentSessionsModel;
