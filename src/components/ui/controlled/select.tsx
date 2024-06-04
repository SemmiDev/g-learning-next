'use client'

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
> = Omit<SelectProps<OptionType>, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledSelect<
  OptionType,
  TFieldValues extends FieldValues = any,
  TName extends FieldPath<TFieldValues> = any
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledSelectProps<OptionType, TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <Select
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          onBlur={onBlur}
          value={value}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
