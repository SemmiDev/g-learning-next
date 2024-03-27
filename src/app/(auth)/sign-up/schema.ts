import { z } from '@/utils/zod-id'

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
