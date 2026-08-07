import express from "express";
import cors from "cors";
import { serverConstants } from "./constants.js";
import rsvpRouter from "./routes/rsvp.js";

const app = express();

app.use(cors);
app.use(express.json());

app.use(serverConstants.BASE_API_PATH, rsvpRouter);

export default app;
