import { google, sheets_v4 } from "googleapis";
import { GoogleAuth, OAuth2Client } from "google-auth-library";

class GoogleSheetsAuth {
  private auth: OAuth2Client | null;
  private googleSheets: sheets_v4.Sheets | null;

  constructor() {
    this.auth = null;
    this.googleSheets = null;
  }

  async authenticate() {
    try {
      if (!this.auth) {
        const googleAuth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        this.auth = (await googleAuth.getClient()) as OAuth2Client;
      }

      if (!this.googleSheets) {
        this.googleSheets = google.sheets({ version: "v4", auth: this.auth });
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'authentification à Google Sheets:",
        error
      );
      throw error;
    }
  }

  getGoogleSheets() {
    return this.googleSheets;
  }
}

export default GoogleSheetsAuth;
