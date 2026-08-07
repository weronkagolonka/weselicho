import { z } from "zod"

export const DietaryRestrictionSchema = z.enum([
  "None",
  "Vegan",
  "Vegetarian",
  "Allergy"
])

export type DietaryRestriction = z.infer<typeof DietaryRestrictionSchema>
