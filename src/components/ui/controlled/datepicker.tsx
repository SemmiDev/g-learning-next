'use client'

import { Without } from '@/utils/without-type'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { DatePicker, DatePickerProps } from '../datepicker'

export type ControlledDatePickerProps = Without<
  DatePickerProps<boolean>,
  'onChange' | 'placeholderText'
> & {
  name: string
  control: Control<any>
  errors?: FieldErrors<any>
  placeholder?: string
  label?: string
  onChange?(): void
}

export default function ControlledDatePicker({
  name,
  control,
  errors,
  placeholder,
  label,
  inputProps,
  ...props
}: ControlledDatePickerProps) {
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
