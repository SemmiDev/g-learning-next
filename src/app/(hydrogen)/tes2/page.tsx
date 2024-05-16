'use client'

import {
  ButtonSubmit,
  ControlledInput,
  ControlledPustakaMedia,
  Form,
  PustakaMediaFileType,
} from '@/components/ui'
import ControlledAsyncPaginateSelect from '@/components/ui/controlled/async-paginate-select'
import ControlledSelect from '@/components/ui/controlled/select'
import { required } from '@/utils/validations/pipe'
import { arrayRequired, objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { tesAsyncAction } from './action'

type OptionType = {
  label: string
  value: string
}

const options: OptionType[] = [
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
  tes1?: OptionType
  tes2?: OptionType
  tes3?: PustakaMediaFileType[]
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
          <ControlledSelect<OptionType>
            name="tes1"
            control={control}
            options={options}
            label="Select"
            placeholder="Pilih Satu"
            errors={errors}
            isClearable
          />
          <ControlledAsyncPaginateSelect<OptionType>
            name="tes2"
            control={control}
            label="Async Paginate Select"
            placeholder="Pilih Satu"
            action={tesAsyncAction}
            construct={(data) => ({
              label: data.nama,
              value: data.id,
            })}
            errors={errors}
            isClearable
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
