import { cleanQuill } from '../string'

export const quillRequired = [
  (value: string) => !!cleanQuill(value),
  {
    message: 'Wajib diisi',
  },
] as const
