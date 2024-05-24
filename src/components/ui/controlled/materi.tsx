'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import Materi, { MateriProps } from '../materi'
import { Without } from '@/utils/without-type'

export type ControlledMateriProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Without<MateriProps, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledMateri<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledMateriProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue } }) => (
        <Materi
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          value={value}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
