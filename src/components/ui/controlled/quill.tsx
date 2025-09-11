'use client'

import dynamic from 'next/dynamic'
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import ReactQuill, { DeltaStatic, EmitterSource } from 'react-quill-new'
import { QuillEditorProps } from '../quill'

const QuillEditor = dynamic(() => import('../quill'), { ssr: false })

export type ControlledQuillEditorProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<QuillEditorProps, 'value' | 'onChange' | 'onBlur'> & {
  name: TName
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  onChange?(
    value: string,
    delta: DeltaStatic,
    source: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ): void
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
  ...props
}: ControlledQuillEditorProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange: setValue, onBlur } }) => (
        <QuillEditor
          value={value}
          onChange={(val, delta, source, editor) => {
            onChange && onChange(val, delta, source, editor)
            setValue(val)
          }}
          onBlur={onBlur}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
