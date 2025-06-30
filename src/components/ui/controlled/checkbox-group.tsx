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
import { Checkbox, CheckboxProps, FieldError } from 'rizzui'
import Label from '../label'
import TextLabel from '../text/label'

export type CheckboxGroupOptionType = AnyObject & {
  label: string
  value: any
  variant?: CheckboxProps['variant']
  size?: CheckboxProps['size']
  labelWeight?: CheckboxProps['labelWeight']
  rounded?: CheckboxProps['rounded']
  labelPlacement?: CheckboxProps['labelPlacement']
  disabled?: CheckboxProps['disabled']
}

export type ControlledCheckboxGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TGroupOption extends CheckboxGroupOptionType
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
  variant?: CheckboxProps['variant']
  size?: CheckboxProps['size']
  labelWeight?: CheckboxProps['labelWeight']
  rounded?: CheckboxProps['rounded']
  labelPlacement?: CheckboxProps['labelPlacement']
}

export default function ControlledCheckboxGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TGroupOption extends CheckboxGroupOptionType = CheckboxGroupOptionType
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
  variant,
  size,
  labelWeight,
  rounded,
  labelPlacement,
}: ControlledCheckboxGroupProps<TFieldValues, TName, TGroupOption>) {
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
                <Checkbox
                  key={option.value}
                  className={cn(
                    '[&_.rizzui-radio-field]:cursor-pointer',
                    optionClassNames
                  )}
                  label={option.label}
                  name={name}
                  value={option.value}
                  onChange={(_) => {
                    onChange && onChange(option.value)

                    if (value.includes(option.value)) {
                      setValue(value.filter((val: any) => val !== option.value))
                    } else {
                      setValue([...value, option.value])
                    }
                  }}
                  onBlur={onBlur}
                  checked={value.includes(option.value)}
                  variant={option.variant ?? variant}
                  size={option.size ?? size}
                  labelWeight={option.labelWeight ?? labelWeight}
                  rounded={option.rounded ?? rounded}
                  labelPlacement={option.labelPlacement ?? labelPlacement}
                  disabled={option.disabled}
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
