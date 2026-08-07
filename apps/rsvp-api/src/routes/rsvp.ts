import { Router } from "express";
import { submitRsvp } from "../controllers/rsvp.js";

const rsvpRouter = Router();

// submit RSVP - update sheet + send confirmation email
// get RSVP
// update RSVP
rsvpRouter.post("/", submitRsvp);

export default rsvpRouter;
