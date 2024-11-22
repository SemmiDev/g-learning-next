'use client'

import { checkMaxFileSize, FileSizeUnit } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { removeFromList } from '@/utils/list'
import dropIcon from '@public/icons/dropzone.svg'
import Image from 'next/image'
import { ReactNode, useCallback, useState } from 'react'
import { DropzoneOptions, FileWithPath, useDropzone } from 'react-dropzone'
import { FieldError } from 'rizzui'
import Label from '../label'
import Text from '../text/text'
import { UploadFileItem, UploadFileItemRejected } from './file-item'

export type UploadFileType = FileWithPath & {
  preview: string
}

export type UploadFileSize = {
  size: number
  unit: FileSizeUnit
}

export type UploadFileProps = Omit<
  DropzoneOptions,
  'onDrop' | 'validator' | 'maxSize' | 'minSize'
> & {
  label?: ReactNode
  required?: boolean
  placeholder?: string
  desc?: string
  onChange?(files: UploadFileType[] | UploadFileType): void
  maxSize?: UploadFileSize
  className?: string
  containerClassName?: string
  error?: string
  errorClassName?: string
  children?: ReactNode
}

export default function UploadFile({
  label,
  required,
  placeholder = 'Seret berkas kamu ke sini atau klik untuk upload',
  desc,
  multiple = false,
  onChange,
  maxSize,
  className,
  containerClassName,
  error,
  errorClassName,
  children,
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
      if (maxSize && checkMaxFileSize(file.size, maxSize.size, maxSize.unit)) {
        return {
          code: 'size-maximum',
          message: `Ukuran berkas maksimal ${maxSize.size}${maxSize.unit}`,
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
    <div className={className}>
      {label && (
        <label className="text-gray-dark font-semibold mb-1.5 block">
          {<Label label={label} required={required} />}
        </label>
      )}
      <div
        className={cn(
          'border rounded-md ring-[0.6px] ring-muted',
          {
            'border-muted': hasFiles,
            'border-dashed': !hasFiles,
            '!border-solid !border-danger [&.is-hover]:!border-danger [&.is-focus]:!border-danger !ring-danger':
              error,
          },
          containerClassName
        )}
      >
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />

          <div className={cn('cursor-pointer px-3 py-2')}>
            {children || (
              <div className="flex flex-col items-center">
                <figure className="upload-icon w-20">
                  <Image src={dropIcon} alt="seret di sini" />
                </figure>
                {placeholder && (
                  <Text
                    weight="semibold"
                    variant="dark"
                    className="upload-placeholder mt-1"
                  >
                    {placeholder}
                  </Text>
                )}
                {desc && (
                  <Text
                    size="sm"
                    weight="medium"
                    variant="lighter"
                    className="upload-description mt-1"
                    align="center"
                  >
                    {desc}
                  </Text>
                )}
              </div>
            )}
          </div>
        </div>
        {(hasFiles || fileRejections.length > 0) && (
          <aside className="flex flex-col space-y-2 border-dashed border-t p-2">
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
