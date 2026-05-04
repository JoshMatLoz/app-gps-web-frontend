import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(4)
});

export type LoginFormData = z.infer<typeof loginSchema>;