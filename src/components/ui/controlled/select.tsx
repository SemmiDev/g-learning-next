'use client'

import { Without } from '@/utils/without-type'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import Select, { SelectProps } from '../select/select'

export type ControlledSelectProps<
  OptionType,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Without<SelectProps<OptionType>, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
}

export default function ControlledSelect<
  OptionType,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  ...props
}: ControlledSelectProps<OptionType, TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <Select
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
