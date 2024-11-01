'use client'

import { AnyObject } from '@/utils/type-interface'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { GroupBase } from 'react-select'
import AsyncPaginateSelect, {
  AdditionalData,
  AsyncPaginateSelectProps,
} from '../select/async-paginate'
import { SelectOptionType } from '../select/select'

export type ControlledAsyncPaginateSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption extends SelectOptionType,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<TOption> = GroupBase<TOption>,
  TData extends AnyObject = AnyObject,
  Additional extends AdditionalData = AdditionalData
> = Omit<
  AsyncPaginateSelectProps<TOption, IsMulti, Group, TData, Additional>,
  'value' | 'onChange' | 'onBlur'
> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledAsyncPaginateSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends SelectOptionType = SelectOptionType,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<TOption> = GroupBase<TOption>,
  TData extends AnyObject = AnyObject,
  Additional extends AdditionalData = AdditionalData
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledAsyncPaginateSelectProps<
  TFieldValues,
  TName,
  TOption,
  IsMulti,
  Group,
  TData,
  Additional
>) {
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
          error={errors ? errors[name]?.message?.toString() : undefined}
          {...props}
        />
      )}
    />
  )
}
