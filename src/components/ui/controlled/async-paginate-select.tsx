'use client'

import { Without } from '@/utils/without-type'
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
> = Without<
  AsyncPaginateSelectProps<OptionType>,
  'value' | 'onChange' | 'onBlur'
> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
}

export default function ControlledAsyncPaginateSelect<
  OptionType,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  ...props
}: ControlledAsyncPaginateSelectProps<OptionType, TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <AsyncPaginateSelect
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
