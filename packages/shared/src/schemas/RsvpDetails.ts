import { Guest, GuestSchema } from "./Guest";
import { z } from "zod";

export const RsvpDetailsSchema = z.object({
  guests: z.array(GuestSchema),
  fromAbroad: z.boolean().optional(),
  requiresTransport: z.boolean().optional(),
  requiresAccommodation: z.boolean().optional()
})

export type RsvpDetails = z.infer<typeof RsvpDetailsSchema>
