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
import { AdvancedRadio, AdvancedRadioProps, FieldError } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'

export type AdvancedRadioGroupOptionType = AnyObject & {
  label: ReactNode
  value: any
  size?: AdvancedRadioProps['size']
  disabled?: AdvancedRadioProps['disabled']
}

export type ControlledAdvancedRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TGroupOption extends AdvancedRadioGroupOptionType
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
  optionInputClassNames?: string
  optionContentClassNames?: string
  errorClassNames?: string
  size?: AdvancedRadioProps['size']
  disabled?: AdvancedRadioProps['disabled']
}

export default function ControlledAdvancedRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TGroupOption extends AdvancedRadioGroupOptionType = AdvancedRadioGroupOptionType
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
  optionInputClassNames,
  optionContentClassNames,
  errorClassNames,
  size,
  disabled,
}: ControlledAdvancedRadioGroupProps<TFieldValues, TName, TGroupOption>) {
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
                <AdvancedRadio
                  key={option.value}
                  className={optionClassNames}
                  inputClassName={optionInputClassNames}
                  contentClassName={optionContentClassNames}
                  name={name}
                  value={option.value}
                  onChange={(_) => {
                    onChange && onChange(option)

                    setValue(option.value)
                  }}
                  onBlur={onBlur}
                  checked={value === option.value}
                  size={option.size ?? size}
                  disabled={option.disabled ?? disabled}
                >
                  {option.label}
                </AdvancedRadio>
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
