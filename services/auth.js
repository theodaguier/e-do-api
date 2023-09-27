const { google } = require("googleapis");

class GoogleSheetsAuth {
  constructor() {
    this.auth = null;
    this.googleSheets = null;
  }

  async authenticate() {
    try {
      if (!this.auth) {
        this.auth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        this.auth = await this.auth.getClient();
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

module.exports = GoogleSheetsAuth;
