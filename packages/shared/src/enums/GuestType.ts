import { z } from "zod";

export const GuestTypeSchema = z.enum([
  "Adult",
  "Teen",
  "Child",
  "Baby"
])

export type GuestType = z.infer<typeof GuestTypeSchema>
