import { z } from "zod";

export const GuestTypeSchema = z.enum([
  "Adult",
  "Teen",
  "Child",
  "Baby"
])
export const AllGuestTypes = GuestTypeSchema.options

export type GuestType = z.infer<typeof GuestTypeSchema>
