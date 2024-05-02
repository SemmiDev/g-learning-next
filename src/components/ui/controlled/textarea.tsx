'use client'

import cn from '@/utils/class-names'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { Textarea, TextareaProps } from 'rizzui'

export type ControlledTextareaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = TextareaProps & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
}

export default function ControlledTextarea<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  labelClassName,
  rows = 3,
  ...props
}: ControlledTextareaProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange, onBlur } }) => (
        <Textarea
          labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
          rows={rows}
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
