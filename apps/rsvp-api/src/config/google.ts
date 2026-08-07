import { google } from "googleapis";
import { authConstants } from "../constants.js";

const auth = new google.auth.GoogleAuth({
  keyFile: authConstants.keyFile,
});

export const sheets = google.sheets({
  version: "v4",
  auth,
});
