'use client'

import {
  ButtonSubmit,
  ControlledInput,
  ControlledPustakaMedia,
  Form,
  PustakaMediaFileType,
  Select,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { arrayRequired, objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { Controller, SubmitHandler } from 'react-hook-form'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const formSchema = z.object({
  tes: z.string().pipe(required),
  tes2: z.any().superRefine(objectRequired),
  tes3: z.array(z.any()).superRefine(arrayRequired),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  tes?: string
  tes2?: object
  tes3?: PustakaMediaFileType[]
}

const initialValues: FormSchema = {}

export default function Tes2Page() {
  const [value, setValue] = useState(0)

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
          <ControlledPustakaMedia
            name="tes3"
            control={control}
            label="Pilih Berkas"
            multiple
          />
          <ControlledInput name="tes" control={control} label="Tes 1" />
          <Controller
            name="tes2"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                label="Tes 2"
                placeholder="Pilih Satu"
                options={options}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isClearable
              />
            )}
          />
          <ButtonSubmit className="flex-1" isSubmitting={isSubmitting}>
            Submit
          </ButtonSubmit>
        </div>
      )}
    </Form>
  )
}
