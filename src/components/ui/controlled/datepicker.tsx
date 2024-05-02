'use client'

import { Without } from '@/utils/without-type'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { DatePicker, DatePickerProps } from '../datepicker'

export type ControlledDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Without<DatePickerProps<boolean>, 'onChange' | 'placeholderText'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  placeholder?: string
  label?: string
  onChange?(): void
}

export default function ControlledDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  placeholder,
  label,
  inputProps,
  ...props
}: ControlledDatePickerProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <DatePicker
          onChange={onChange}
          onBlur={onBlur}
          selected={value}
          placeholderText={placeholder}
          inputProps={{
            error: errors ? (errors[name]?.message as string) : undefined,
            label: label,
            ...inputProps,
          }}
          {...props}
        />
      )}
    />
  )
}
