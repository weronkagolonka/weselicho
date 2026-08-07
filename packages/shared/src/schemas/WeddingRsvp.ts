import { InviteeSchema } from "./Invitee.js";
import { RsvpDetailsSchema } from "./RsvpDetails.js";
import { z } from "zod";

export const WeddingRsvpSchema = z.object({
  participating: z.boolean({
    error: "Please confirm"
  }).optional(),
  invitee: InviteeSchema,
  details: RsvpDetailsSchema
})

export type WeddingRsvp = z.infer<typeof WeddingRsvpSchema>
