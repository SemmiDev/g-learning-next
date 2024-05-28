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
> = Without<
  DatePickerProps<boolean>,
  'placeholderText' | 'value' | 'onChange' | 'onBlur'
> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  placeholder?: string
  label?: string
  onChange?(date: any, event: any): void
}

export default function ControlledDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  placeholder,
  label,
  onChange,
  inputProps,
  ...props
}: ControlledDatePickerProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <DatePicker
          onChange={(val, e) => {
            onChange && onChange(val, e)
            setValue(val)
          }}
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
