import { z } from '../zod-id'

const message = 'Wajib diisi'

export const required = z.string().trim().min(1, { message: message })

export const requiredPassword = z.string().min(1, { message: message })
