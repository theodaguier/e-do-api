export interface GoogleSheetsAuth {
  authenticate(): Promise<void>;
  getGoogleSheets(): any;
}

export interface Session {
  client: Client;
  split: any;
  id: string;
  name: string;
  address: string;
  phone: string;
  siren: string;
  reservations: Reservation;
  equipments: Equipment[];
  notes: string;
  createdBy: string;
  lastUpdatedBy: string;
  status: string;
  createdAt: string;
  endAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Equipment {
  equipment: any;
  name: string;
  quantity: number;
}

export interface Machine {
  id: string;
  name: string;
  hours: number;
}

export interface Reservation {
  push(arg0: { hours: number; machine: string }): unknown;
  concat(reservations: Reservation): Reservation;
  split?: any;
  hours?: number;
  machine?: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  brand: string;
  siren: string;
  phone: string;
  email: string;
}

export interface EquipmentStock {
  id: number;
  name: string;
  cat: string;
  price: number;
  qty: number;
}

export interface ColoramaModel {
  googleSheetsAuth: GoogleSheetsAuth;
  spreadsheetId: string;
  id: number;
  name: string;
  color: string;
  qty: number;
}

export interface ColoramaModel {
  id: number;
  name: string;
  color: string;
  qty: number;
}

export interface Colorama {
  id: number;
  name: string;
  color: string;
  qty: number;
}

export interface ColoramaController {
  coloramaModel: ColoramaModel;
  getColoramas(): Promise<Colorama[]>;
  postColorama(colorama: Colorama): Promise<void>;
  updateColoramas(colorama: Colorama): Promise<void>;
}

export interface ClientController {
  clientModel: Client;
  getClients(): Promise<Client[]>;
  getClientById(id: string): Promise<Client>;
  postClient(client: Client): Promise<void>;
}
