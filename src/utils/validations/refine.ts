import { RefinementCtx } from 'zod'
import { z } from '../zod-id'

export const fileRequired =
  ({ desc = 'Berkas' }: { desc?: string } = {}) =>
  (files: FileList, ctx: RefinementCtx) => {
    if (files.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${desc} wajib diisi`,
      })
    }
  }

export const maxFileSize =
  ({
    max,
    metric,
    desc = 'berkas',
  }: {
    max: number
    metric: 'B' | 'KB' | 'MB' | 'GB'
    desc?: string
  }) =>
  (files: FileList, ctx: RefinementCtx) => {
    const metricSize =
      metric === 'KB'
        ? 1024
        : metric === 'MB'
        ? 1024 * 1024
        : metric === 'GB'
        ? 1024 * 1024 * 1024
        : 1
    const maxSize = max * metricSize

    if (files.length > 0 && files?.[0]?.size > maxSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Ukuran ${desc} maksimal ${max}${metric}`,
      })
    }
  }

export const imageFileOnly = (files: FileList, ctx: RefinementCtx) => {
  if (
    files.length > 0 &&
    !['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
      files?.[0]?.type
    )
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Pastikan format gambar .jpg, .jpeg, .png atau .webp',
    })
  }
}

export const objectRequired = (val: any, ctx: RefinementCtx) => {
  if (val === undefined || val === null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Wajib diisi',
    })
  }
}

export const arrayRequired = (val: any[], ctx: RefinementCtx) => {
  if (val === undefined || val === null || val.length <= 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Wajib diisi',
    })
  }
}
