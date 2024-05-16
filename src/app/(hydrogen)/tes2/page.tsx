'use client'

import {
  ButtonSubmit,
  ControlledInput,
  ControlledPustakaMedia,
  Form,
  PustakaMediaFileType,
  Select,
} from '@/components/ui'
import AsyncPaginateSelect from '@/components/ui/select/async-paginate'
import { arrayRequired, objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'
import { GroupBase } from 'react-select'
import { tesAsyncAction } from './action'
import { required } from '@/utils/validations/pipe'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const formSchema = z.object({
  tesx: z.string().pipe(required),
  tes1: z.any().superRefine(objectRequired),
  tes2: z.any().superRefine(objectRequired),
  tes3: z.array(z.any()).superRefine(arrayRequired),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  tesx?: string
  tes1?: object
  tes2?: OptionType
  tes3?: PustakaMediaFileType[]
}

type OptionType = {
  label: string
  value: string
}

const initialValues: FormSchema = {}

export default function Tes2Page() {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Form<FormSchema>
      onSubmit={onSubmit}
      validationSchema={formSchema}
      useFormProps={{
        mode: 'onSubmit',
        defaultValues: initialValues,
      }}
    >
      {({ control, formState: { errors, isSubmitting } }) => (
        <div className="space-y-4">
          <div>{JSON.stringify(errors)}</div>
          <Controller
            name="tes1"
            control={control}
            render={({ field: { name, value, onChange, onBlur } }) => (
              <Select
                label="Select"
                placeholder="Pilih Satu"
                options={options}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={errors ? (errors[name]?.message as string) : undefined}
                isClearable
              />
            )}
          />
          <Controller
            name="tes2"
            control={control}
            render={({ field: { name, value, onChange, onBlur } }) => (
              <AsyncPaginateSelect<OptionType, GroupBase<OptionType>, boolean>
                label="Async Paginate Select"
                placeholder="Pilih Satu"
                action={tesAsyncAction}
                construct={(data) => ({
                  label: data.nama,
                  value: data.id,
                })}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={errors ? (errors[name]?.message as string) : undefined}
                isClearable
              />
            )}
          />
          <ControlledPustakaMedia
            name="tes3"
            control={control}
            label="Pilih Berkas"
            errors={errors}
            multiple
          />
          <ControlledInput
            name="tesx"
            control={control}
            label="Input"
            placeholder="Input disini"
            errors={errors}
          />
          <ButtonSubmit className="flex-1" isSubmitting={isSubmitting}>
            Submit
          </ButtonSubmit>
        </div>
      )}
    </Form>
  )
}
