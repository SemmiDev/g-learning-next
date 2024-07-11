'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import Select, { SelectOptionType, SelectProps } from '../select/select'

export type ControlledSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  OptionType extends SelectOptionType
> = Omit<SelectProps<OptionType>, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  OptionType extends SelectOptionType = SelectOptionType
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledSelectProps<TFieldValues, TName, OptionType>) {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <Select<OptionType>
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
