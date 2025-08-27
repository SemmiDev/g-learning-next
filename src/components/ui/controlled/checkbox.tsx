'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { Checkbox, CheckboxProps } from 'rizzui'

export type ControlledCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<CheckboxProps, 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  className,
  onChange,
  ...props
}: ControlledCheckboxProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <Checkbox
          name={name}
          onChange={(e) => {
            onChange && onChange(e.target.checked)
            setValue(e.target.checked)
          }}
          onBlur={onBlur}
          error={errors ? (errors[name]?.message as string) : undefined}
          checked={value ?? false}
          {...props}
        />
      )}
    />
  )
}
