import { sheets } from "../config/google.js";

export async function appendRsvp(rsvp: WeddingRsvp) {
  await sheets.spreadsheets.values.append(params, options);
}
