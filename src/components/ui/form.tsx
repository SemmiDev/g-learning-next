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

type ServerErrors<T> = {
  [Property in keyof T]: string
}

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  useFormProps?: UseFormProps<TFormValues>
  validationSchema?: Schema<TFormValues>
  fieldErrors?: any[]
  formError?: string | string[] | any
  serverError?: ServerErrors<Partial<TFormValues>>
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
  fieldErrors,
  formError,
  resetValues,
  className,
  ...formProps
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
      onSubmit={methods.handleSubmit(onSubmit)}
      {...formProps}
      className={className}
    >
      {children(methods)}
    </form>
  )
}
