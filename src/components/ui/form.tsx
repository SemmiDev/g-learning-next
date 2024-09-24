'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import type { Schema } from 'zod'

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  useFormProps?: UseFormProps<TFormValues>
  validationSchema?: Schema<TFormValues>
  resetValues?: any
  className?: string
}

export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  resetValues,
  className,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
  })

  useEffect(() => {
    if (resetValues) {
      methods.reset(resetValues)
    }
  }, [resetValues, methods])

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.stopPropagation()
        methods.handleSubmit(onSubmit)(event)
      }}
      className={className}
    >
      {children(methods)}
    </form>
  )
}
