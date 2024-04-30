'use client'

import { Control, Controller, FieldErrors } from 'react-hook-form'
import { DatePicker, DatePickerProps } from '../datepicker'
import { Without } from '@/utils/without-type'

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
  onChange,
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
