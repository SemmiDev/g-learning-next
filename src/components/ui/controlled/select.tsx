'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { GroupBase } from 'react-select'
import Select, { SelectOptionType, SelectProps } from '../select/select'

export type ControlledSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOptionVal extends string | number,
  TOption extends SelectOptionType<TOptionVal>,
  IsMulti extends boolean,
  Group extends GroupBase<TOption>
> = Omit<
  SelectProps<TOption, IsMulti, Group>,
  'value' | 'defaultValue' | 'onChange' | 'onBlur'
> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOptionVal extends string | number = string | number,
  TOption extends SelectOptionType<TOptionVal> = SelectOptionType<TOptionVal>,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<TOption> = GroupBase<TOption>
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledSelectProps<
  TFieldValues,
  TName,
  TOptionVal,
  TOption,
  IsMulti,
  Group
>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <Select<TOption, IsMulti, Group>
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
