import app from "./api.js";
import { serverConstants } from "./constants.js";

app.listen(serverConstants.SERVER_PORT, () => {
  console.log(`Listening on ${serverConstants.SERVER_PORT}`);
});
