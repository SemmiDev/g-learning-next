'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import PustakaMedia, { PustakaMediaProps } from '../pustaka-media'
import { Without } from '@/utils/without-type'

export type ControlledPustakaMediaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Without<PustakaMediaProps, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledPustakaMedia<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
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
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
