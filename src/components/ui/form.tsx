'use client'

import cn from '@/utils/class-names'
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
  resetValues?: TFormValues
  flexing?: boolean
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
  flexing,
  className,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
  })

  useEffect(() => {
    if (resetValues) {
      setTimeout(() => {
        methods.reset(resetValues)
      }, 0)
    }
  }, [resetValues, methods])

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.stopPropagation()
        methods.handleSubmit(onSubmit)(event)
      }}
      className={cn(
        {
          'flex flex-col justify-between flex-1': flexing,
        },
        className
      )}
    >
      {children(methods)}
    </form>
  )
}
