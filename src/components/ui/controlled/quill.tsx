'use client'

import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { QuillEditorProps } from '../quill'
import dynamic from 'next/dynamic'
import cn from '@/utils/class-names'

const QuillEditor = dynamic(() => import('../quill'), { ssr: false })

export type ControlledQuillEditorProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<QuillEditorProps, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(value: any): void
  minHeight?: number
}

export default function ControlledQuillEditor<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  errors,
  labelClassName,
  onChange,
  minHeight,
  className,
  ...props
}: ControlledQuillEditorProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <QuillEditor
          value={value}
          onChange={(val) => {
            onChange && onChange(val)
            setValue(val)
          }}
          onBlur={onBlur}
          error={errors ? (errors[name]?.message as string) : undefined}
          className={cn(
            {
              [`col-span-full [&_.ql-editor]:min-h-[${minHeight}px]`]:
                !!minHeight,
            },
            className
          )}
          {...props}
        />
      )}
    />
  )
}
