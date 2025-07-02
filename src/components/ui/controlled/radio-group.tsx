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
import { FieldError, Radio, RadioProps } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'

export type RadioGroupOptionType = AnyObject & {
  label: string
  value: any
  variant?: RadioProps['variant']
  size?: RadioProps['size']
  labelWeight?: RadioProps['labelWeight']
  labelPlacement?: RadioProps['labelPlacement']
  disabled?: RadioProps['disabled']
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
  required?: boolean
  options?: TGroupOption[]
  onChange?(value: any): void
  className?: string
  labelClassName?: string
  groupClassName?: string
  optionClassNames?: string
  errorClassNames?: string
  variant?: RadioProps['variant']
  size?: RadioProps['size']
  labelWeight?: RadioProps['labelWeight']
  labelPlacement?: RadioProps['labelPlacement']
  disabled?: RadioProps['disabled']
}

export default function ControlledRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TGroupOption extends RadioGroupOptionType = RadioGroupOptionType
>({
  name,
  control,
  errors,
  label,
  required,
  options,
  onChange,
  className,
  labelClassName,
  groupClassName,
  optionClassNames,
  errorClassNames,
  variant,
  size,
  labelWeight,
  labelPlacement,
  disabled,
}: ControlledRadioGroupProps<TFieldValues, TName, TGroupOption>) {
  const error = errors ? (errors[name]?.message as string) : undefined

  return (
    <div className={className}>
      {label && (
        <TextLabel className={cn('mb-1', labelClassName)}>
          <Label label={label} required={required} />
        </TextLabel>
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
                  onChange={(_) => {
                    onChange && onChange(option)

                    setValue(option.value)
                  }}
                  onBlur={onBlur}
                  checked={value === option.value}
                  variant={option.variant ?? variant}
                  size={option.size ?? size}
                  labelWeight={option.labelWeight ?? labelWeight}
                  labelPlacement={option.labelPlacement ?? labelPlacement}
                  disabled={option.disabled ?? disabled}
                />
              ))}
            </>
          )}
        />
      </div>
      {error && (
        <FieldError
          size="md"
          error={error}
          className={cn('mt-2', errorClassNames)}
        />
      )}
    </div>
  )
}
