'use client'

import cn from '@/utils/class-names'
import { AnyObject } from '@/utils/type-interface'
import { ReactNode } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { FieldError, Radio } from 'rizzui'
import TextLabel from '../text/label'

export type RadioGroupOptionType = AnyObject & {
  label: string
  value: any
}

export type ControlledRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TGroupOption extends RadioGroupOptionType
> = {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  label?: ReactNode
  options?: TGroupOption[]
  onChange?(value: any): void
  className?: string
  labelClassName?: string
  groupClassName?: string
  optionClassNames?: string
}

export default function ControlledRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TGroupOption extends RadioGroupOptionType = RadioGroupOptionType
>({
  name,
  control,
  errors,
  label,
  options,
  onChange,
  className,
  labelClassName,
  groupClassName,
  optionClassNames,
}: ControlledRadioGroupProps<TFieldValues, TName, TGroupOption>) {
  const error = errors ? (errors[name]?.message as string) : undefined

  return (
    <div className={className}>
      {label && (
        <TextLabel className={cn('mb-1', labelClassName)}>{label}</TextLabel>
      )}
      <div className={cn('flex gap-4', groupClassName)}>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange: setValue, onBlur } }) => (
            <>
              {options?.map((option) => (
                <Radio
                  key={option.value}
                  className={cn(
                    '[&_.rizzui-radio-field]:cursor-pointer',
                    optionClassNames
                  )}
                  label={option.label}
                  name={name}
                  value={option.value}
                  onChange={(val) => {
                    onChange && onChange(val)
                    setValue(val)
                  }}
                  onBlur={onBlur}
                  checked={value === option.value}
                />
              ))}
            </>
          )}
        />
        {error && <FieldError size="md" error={error} />}
      </div>
    </div>
  )
}
