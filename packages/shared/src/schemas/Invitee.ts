import { z } from "zod";

export const InviteeSchema = z.object({
  email: z.email(),
  phone: z.e164(),
  name: z.string().trim().min(1, "Name is required"),
  surname: z.string().trim().min(1, "Surname is required")
})

export type Invitee = z.infer<typeof InviteeSchema>
