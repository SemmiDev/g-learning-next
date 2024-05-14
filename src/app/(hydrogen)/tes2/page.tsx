'use client'

import PustakaMedia from '@/components/shared/pustaka-media'
import { ControlledInput, Form } from '@/components/ui'
import Select from '@/components/ui/select'
import { useState } from 'react'
import { z } from '@/utils/zod-id'
import { Controller, SubmitHandler } from 'react-hook-form'
import { required } from '@/utils/validations/pipe'
import ButtonSubmit from '@/components/ui/button/submit'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const formSchema = z.object({
  tes: z.string().pipe(required),
  tes2: z.any().optional(),
  tes3: z.array(z.any()),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  tes?: string
  tes2?: object
  tes3?: string[]
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
          <Controller
            name="tes3"
            control={control}
            render={({ field: { onChange } }) => (
              <PustakaMedia label="Pilih Berkas" onChange={onChange} multiple />
            )}
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
