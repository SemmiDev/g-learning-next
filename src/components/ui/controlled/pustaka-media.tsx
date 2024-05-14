'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import PustakaMedia, { PustakaMediaProps } from '../pustaka-media'

export type ControlledPustakaMediaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = PustakaMediaProps & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
}

export default function ControlledPustakaMedia<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledPustakaMediaProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue } }) => (
        <PustakaMedia
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          value={value}
          {...props}
        />
      )}
    />
  )
}
