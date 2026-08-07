import { z } from "zod"

export const DietaryRestrictionSchema = z.enum([
  "None",
  "Vegan",
  "Vegetarian",
  "Allergy"
])
export const AllDietaryRestrictions = DietaryRestrictionSchema.options

export type DietaryRestriction = z.infer<typeof DietaryRestrictionSchema>
