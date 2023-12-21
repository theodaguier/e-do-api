import GoogleSheetsAuth from "../services/auth";
import { EquipmentStock } from "../types/def.type";

class EquipmentModel {
  static getEquipmentById(id: string) {
    throw new Error("Method not implemented.");
  }
  static createEquipment(equipment: {
    id: any;
    name: any;
    cat: any;
    price: any;
    qty: any;
  }) {
    throw new Error("Method not implemented.");
  }
  static updateEquipmentByCategory(updatedEquipments: any, cat: string) {
    throw new Error("Method not implemented.");
  }
  static getEquipmentByCategory(cat: string) {
    throw new Error("Method not implemented.");
  }
  static getEquipment() {
    throw new Error("Method not implemented.");
  }
  googleSheetsAuth: GoogleSheetsAuth;
  spreadsheetId: string;
  id: any;
  name: any;
  cat: any;
  price: any;
  qty: any;
  constructor(id: any, name: any, cat: any, price: any, qty: any) {
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
      const auth = this.googleSheetsAuth.getGoogleSheets() as any;

      const getRows = await auth.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "Equipments!A2:E",
      });

      const rows = getRows.data.values;

      const filteredEquipments = rows
        ?.slice(1)
        .map((row: any, index: number) => {
          const equipment = {
            id: Number(row[0]),
            name: row[1],
            cat: row[2],
            price: Number(row[3]),
            qty: Number(row[4]),
          };

          return equipment;
        });

      const equipmentsWithId = filteredEquipments?.filter(
        (equipment: EquipmentStock) => equipment.id !== null
      );

      return equipmentsWithId;
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  async getEquipmentById(id: number) {
    try {
      const equipments = await this.getEquipment();
      const equipment = equipments?.find(
        (equipment: EquipmentStock) => equipment.id === id
      );

      return equipment;
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  async getEquipmentByCategory(cat: string) {
    try {
      const equipments = await this.getEquipment();
      const equipmentsByCategory = equipments?.filter(
        (equipment: EquipmentStock) => equipment.cat === cat
      );

      return equipmentsByCategory;
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  async getOnlyEquipment() {
    try {
      const equipments = await this.getEquipment();

      return equipments;
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  async createEquipment(equipment: EquipmentStock) {
    try {
      const equipments = (await this.getEquipment()) as EquipmentStock[];
      const newId = equipments.length + 1;

      const newEquipment = {
        id: newId,
        name: equipment.name,
        cat: equipment.cat,
        price: equipment.price,
        qty: equipment.qty,
      };

      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets() as any;

      // Recherche la première ligne vide
      const firstEmptyRow = equipments.findIndex(
        (equipment: EquipmentStock) => equipment.name === ""
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
      return { error: (err as Error).message };
    }
  }
  async updateEquipmentByCategory(
    updatedEquipments: EquipmentStock,
    cat: string
  ) {
    try {
      // Récupère tous les équipements
      const allEquipments = (await this.getEquipment()) as EquipmentStock[];

      // Filtrer les équipements de la catégorie spécifiée
      const equipmentsToUpdate = allEquipments.filter(
        (equipment: EquipmentStock) => equipment.cat === cat
      );

      // Authentification Google Sheets
      await this.googleSheetsAuth.authenticate();
      const auth = this.googleSheetsAuth.getGoogleSheets() as any;

      // Parcourir les équipements à mettre à jour
      for (const updatedEquipment of updatedEquipments as unknown as EquipmentStock[]) {
        // Trouver l'index de l'équipement dans la liste complète
        const indexToUpdate = allEquipments.findIndex(
          (equipment: EquipmentStock) => equipment.id === updatedEquipment.id
        );

        // Mettre à jour les propriétés modifiables
        if (indexToUpdate !== -1) {
          allEquipments[indexToUpdate].id = updatedEquipment.id;
          allEquipments[indexToUpdate].name = updatedEquipment.name;
          allEquipments[indexToUpdate].price = updatedEquipment.price;
          allEquipments[indexToUpdate].qty = updatedEquipment.qty;

          // Mettre à jour les valeurs dans la feuille de calcul
          const range = `Equipments!A${indexToUpdate + 3}:E${
            indexToUpdate + 3
          }`;
          const values = [
            [
              allEquipments[indexToUpdate].id,
              allEquipments[indexToUpdate].name,
              allEquipments[indexToUpdate].cat,
              allEquipments[indexToUpdate].price,
              allEquipments[indexToUpdate].qty,
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
        }
      }

      return allEquipments;
    } catch (err) {
      return { error: (err as Error).message };
    }
  }
}

export default EquipmentModel;
