'use client'

import cn from '@/utils/class-names'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import Input, { InputProps } from '../input'
import { Without } from '@/utils/without-type'

export type ControlledInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Without<InputProps, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  labelClassName,
  onChange,
  ...props
}: ControlledInputProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <Input
          labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          onBlur={onBlur}
          value={value ?? ''}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
