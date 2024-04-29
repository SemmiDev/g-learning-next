'use client'

import cn from '@/utils/class-names'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Textarea, TextareaProps } from 'rizzui'

export type ControlledTextareaProps = TextareaProps & {
  name: string
  control: Control
  errors?: FieldErrors
}

export default function ControlledTextarea({
  name,
  control,
  errors,
  labelClassName,
  rows = 3,
  ...props
}: ControlledTextareaProps) {
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
