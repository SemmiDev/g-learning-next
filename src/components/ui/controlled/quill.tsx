'use client'

import { Control, Controller, FieldErrors } from 'react-hook-form'
import QuillEditor, { QuillEditorProps } from '../quill'

export type ControlledQuillEditorProps = QuillEditorProps & {
  name: string
  control: Control<any>
  errors?: FieldErrors<any>
}

export default function ControlledQuillEditor({
  name,
  control,
  errors,
  labelClassName,
  ...props
}: ControlledQuillEditorProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <QuillEditor
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={errors ? (errors[name]?.message as string) : undefined}
          {...props}
        />
      )}
    />
  )
}
