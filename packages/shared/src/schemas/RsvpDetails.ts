import { GuestSchema } from "./Guest.js";
import { z } from "zod";

export const RsvpDetailsSchema = z.object({
  guests: z.array(GuestSchema).superRefine((guests, ctx) => {
    const adults = guests.filter((g) => g.type === "Adult")

    if (adults.length < 1) {
            ctx.addIssue({
              code: "too_small",
              origin: "array",
              minimum: 1,
              message: "At least one adult is required",
            });
          }

          if (adults.length > 2) {
            ctx.addIssue({
              code: "too_big",
              origin: "array",
              maximum: 2,
              message: "Maximum two adults are allowed",
            });
          }
  }),
  fromAbroad: z.boolean().optional(),
  requiresTransport: z.boolean().optional(),
  requiresAccommodation: z.boolean().optional()
})

export type RsvpDetails = z.infer<typeof RsvpDetailsSchema>
