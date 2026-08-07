import { DietaryRestriction, DietaryRestrictionSchema } from "../enums/DietaryRestriction";
import { GuestType, GuestTypeSchema } from "../enums/GuestType";
import {z} from "zod"

export const GuestSchema = z.object({
  type: GuestTypeSchema.default("Adult"),
  name: z.string().trim().min(1, "Name cannot be blank"),
  surname: z.string().trim().min(1, "Name cannot be blank"),
  pregnant: z.boolean().optional(),
  dietaryRestriction: DietaryRestrictionSchema.default("None"),
  allergy: z.string().optional(),
  requiresHighChair: z.boolean().optional(),
  requiresBabyFood: z.boolean().optional()
})

export type Guest = z.infer<typeof GuestSchema>
