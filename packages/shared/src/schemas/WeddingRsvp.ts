import { Invitee, InviteeSchema } from "./Invitee";
import { RsvpDetails, RsvpDetailsSchema } from "./RsvpDetails";
import { z } from "zod";

export const WeddingRsvpSchema = z.object({
  participating: z.boolean().optional(),
  invitee: InviteeSchema,
  details: RsvpDetailsSchema
})

export type WeddingRsvp = z.infer<typeof WeddingRsvpSchema>
