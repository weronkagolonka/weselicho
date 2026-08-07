import { DietaryRestrictionSchema } from "../enums/DietaryRestriction.js";
import { GuestTypeSchema } from "../enums/GuestType.js";
import {z} from "zod"

export const GuestSchema = z.object({
  type: GuestTypeSchema,
  name: z.string().trim().min(1, "Name cannot be blank"),
  surname: z.string().trim().min(1, "Surname cannot be blank"),
  pregnant: z.boolean().optional(),
  dietaryRestriction: DietaryRestrictionSchema,
  allergy: z.string().optional(),
  requiresHighChair: z.boolean().optional(),
  requiresBabyFood: z.boolean().optional()
})

export type Guest = z.infer<typeof GuestSchema>
