import { z } from '@/utils/zod-id'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export type LoginSchema = z.infer<typeof loginSchema>
