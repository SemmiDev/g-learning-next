'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import PaketSoal, { PaketSoalProps } from '../../shared/paket-soal'

export type ControlledPaketSoalProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<PaketSoalProps, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledPaketSoal<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  onChange,
  ...props
}: ControlledPaketSoalProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue } }) => (
        <PaketSoal
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          value={value}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
