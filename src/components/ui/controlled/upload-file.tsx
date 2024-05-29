'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { Without } from '@/utils/without-type'
import { UploadFile, UploadFileProps } from '../upload-file'

export type ControlledUploadFileProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Without<UploadFileProps, 'onChange'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledUploadFile<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledUploadFileProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: setValue } }) => (
        <UploadFile
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
