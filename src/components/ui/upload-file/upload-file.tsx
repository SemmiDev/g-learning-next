'use client'

import { checkMaxFileSize, FileSizeMetric } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { removeFromList } from '@/utils/list'
import { Without } from '@/utils/without-type'
import dropIcon from '@public/icons/dropzone.svg'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { DropzoneOptions, FileWithPath, useDropzone } from 'react-dropzone'
import { FieldError } from 'rizzui'
import Text from '../text/text'
import { UploadFileItem, UploadFileItemRejected } from './file-item'

export type UploadFileType = FileWithPath & {
  preview: string
}

export type UploadFileSize = {
  size: number
  metric: FileSizeMetric
}

export type UploadFileProps = Without<
  DropzoneOptions,
  'onDrop' | 'validator' | 'maxSize' | 'minSize'
> & {
  label?: string
  placeholder?: string
  desc?: string
  onChange?(files: UploadFileType[] | UploadFileType): void
  maxSize?: UploadFileSize
  error?: string
  errorClassName?: string
}

export default function UploadFile({
  label,
  placeholder = 'Seret berkas kamu ke sini atau klik untuk upload',
  desc,
  multiple = false,
  onChange,
  maxSize,
  error,
  errorClassName,
  ...options
}: UploadFileProps) {
  const [files, setFiles] = useState<UploadFileType[]>([])

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const selectedFiles = multiple
        ? [...files, ...acceptedFiles]
        : acceptedFiles

      const selectedUploadFiles = selectedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )

      setFiles(selectedUploadFiles)
      onChange &&
        onChange(multiple ? selectedUploadFiles : selectedUploadFiles[0])
    },
    [files, onChange, multiple]
  )

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: multiple,
    onDrop: onDrop,
    validator: (file) => {
      if (
        maxSize &&
        checkMaxFileSize(file.size, maxSize.size, maxSize.metric)
      ) {
        return {
          code: 'size-maximum',
          message: `Ukuran berkas maksimal ${maxSize.size}${maxSize.metric}`,
        }
      }
      return null
    },
    ...options,
  })

  const removeFile = (file: UploadFileType) => {
    const selectedFiles = removeFromList<UploadFileType>(files, file)
    onChange && onChange(multiple ? selectedFiles : selectedFiles[0])
    setFiles(selectedFiles)
  }

  const hasFiles = files.length > 0

  return (
    <div>
      {label && (
        <label className="text-gray-dark font-semibold mb-1.5 block">
          {label}
        </label>
      )}
      <div
        className={cn('border rounded-md ring-[0.6px] ring-muted p-3', {
          'border-muted': hasFiles,
          'border-dashed': !hasFiles,
          '!border-solid !border-red [&.is-hover]:!border-red [&.is-focus]:!border-red !ring-red':
            error,
        })}
      >
        <div
          className="dropzone flex flex-col items-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <figure className="w-20">
            <Image src={dropIcon} alt="seret di sini" />
          </figure>
          {placeholder && (
            <Text weight="semibold" variant="dark" className="mt-1">
              {placeholder}
            </Text>
          )}
          {desc && (
            <Text size="sm" weight="medium" variant="lighter" className="mt-1">
              {desc}
            </Text>
          )}
        </div>
        {(hasFiles || fileRejections.length > 0) && (
          <aside className="flex flex-col space-y-2 border-dashed border-t pt-2 mt-2">
            {files.map((file: UploadFileType, idx) => (
              <UploadFileItem
                file={file}
                removeFile={removeFile}
                key={`okfile-${idx}`}
              />
            ))}
            {fileRejections.map(({ file, errors }, idx) => {
              return (
                <UploadFileItemRejected
                  file={Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })}
                  errors={errors}
                  key={`nofile-${idx}`}
                />
              )
            })}
          </aside>
        )}
      </div>
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  )
}
