import cn from '@/utils/class-names'
import { Without } from '@/utils/without-type'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { Radio, RadioProps } from 'rizzui'

export type ControlledRadioProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Without<RadioProps, 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
}

export default function ControlledRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  className,
  onChange,
  ...props
}: ControlledRadioProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <Radio
          className={cn('[&_.rizzui-radio-field]:cursor-pointer', className)}
          name={name}
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          onBlur={onBlur}
          error={errors ? (errors[name]?.message as string) : undefined}
          checked={value === props.value}
          {...props}
        />
      )}
    />
  )
}
