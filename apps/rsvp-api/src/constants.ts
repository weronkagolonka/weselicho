export const serverConstants = {
  BASE_API_PATH: "/api/v1/rsvp",
  SERVER_PORT: 8080,
};

export const authConstants = {
  keyFile: "./service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
};

export const env = {
  SPREADSHEET_ID: process.env.SPREADSHEET_ID,
};
