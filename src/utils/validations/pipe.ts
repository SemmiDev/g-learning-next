import { z } from '../zod-id'

export const required = z
  .string()
  .trim()
  .min(1, { message: 'Tidak boleh kosong.' })
