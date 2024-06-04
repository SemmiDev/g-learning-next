'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import AsyncPaginateSelect, {
  AsyncPaginateSelectProps,
} from '../select/async-paginate'

export type ControlledAsyncPaginateSelectProps<
  OptionType,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<
  AsyncPaginateSelectProps<OptionType>,
  'value' | 'onChange' | 'onBlur'
> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledAsyncPaginateSelect<
  OptionType,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledAsyncPaginateSelectProps<OptionType, TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <AsyncPaginateSelect
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
