import cn from '@/utils/class-names'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Input, InputProps } from 'rizzui'

type ControlledInputProps = InputProps & {
  name: string
  control: Control
  errors?: FieldErrors
}

export default function ControlledInput({
  name,
  control,
  errors,
  labelClassName,
  ...props
}: ControlledInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange, onBlur } }) => (
        <Input
          labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
          onChange={onChange}
          onBlur={onBlur}
          value={value ?? ''}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
