'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import InputNumber, { InputNumberProps } from '../input/number'
import cn from '@/utils/class-names'

export type ControlledInputNumberProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<InputNumberProps, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
  stepper?: boolean
}

export default function ControlledInputNumber<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  onChange,
  size,
  stepper,
  ...props
}: ControlledInputNumberProps<TFieldValues, TName>) {
  const max =
    props.max !== undefined ? parseFloat(props.max as string) : undefined
  const min =
    props.min !== undefined ? parseFloat(props.min as string) : undefined
  const step = props.step ? parseFloat(props.step as string) : 1

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <InputNumber
          size={size}
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          onBlur={onBlur}
          suffix={
            stepper && (
              <div
                className={cn('grid gap-0.5 p-0.5 -mr-3.5', {
                  '-mr-2': size === 'sm',
                  '-mr-4': size === 'lg',
                  '-mr-5': size === 'xl',
                })}
              >
                <button
                  type="button"
                  className="rounded-sm bg-gray-50 py-0.5 px-1.5 hover:bg-gray-100 focus:bg-gray-100"
                  onClick={() => {
                    const newValue = value + step
                    if (max !== undefined && newValue > max) setValue(max)
                    else if (min !== undefined && newValue < min) setValue(min)
                    else setValue(newValue)
                  }}
                >
                  <BsChevronUp
                    className={cn('size-3', {
                      'size-2': size === 'sm',
                      'size-4': size === 'lg',
                      'size-5': size === 'xl',
                    })}
                  />
                </button>
                <button
                  type="button"
                  className="rounded-sm bg-gray-50 py-0.5 px-1.5 hover:bg-gray-100 focus:bg-gray-100"
                  onClick={() => {
                    const newValue = value - step
                    if (max !== undefined && newValue > max) setValue(max)
                    else if (min !== undefined && newValue < min) setValue(min)
                    else setValue(newValue)
                  }}
                >
                  <BsChevronDown
                    className={cn('size-3', {
                      'size-2': size === 'sm',
                      'size-4': size === 'lg',
                      'size-5': size === 'xl',
                    })}
                  />
                </button>
              </div>
            )
          }
          value={value ?? ''}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
