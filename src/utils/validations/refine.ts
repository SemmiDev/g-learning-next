import { RefinementCtx } from 'zod'
import { checkMaxFileSize, FileSizeMetric } from '../bytes'
import { z } from '../zod-id'
import { UploadFileType } from '@/components/ui/upload-file/upload-file'

export const maxUploadFileSize =
  ({
    max,
    metric,
    desc = 'berkas',
  }: {
    max: number
    metric: FileSizeMetric
    desc?: string
  }) =>
  (files: UploadFileType[] | UploadFileType, ctx: RefinementCtx) => {
    if (!Array.isArray(files)) {
      files = [files]
    }

    for (const file of files) {
      if (file && checkMaxFileSize(file.size, max, metric)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Ukuran ${desc} maksimal ${max}${metric}`,
        })
      }
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
