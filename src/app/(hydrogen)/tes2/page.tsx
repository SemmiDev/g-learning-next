'use client'

import {
  ButtonSubmit,
  ControlledDatePicker,
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
  // tesInput: z.string().pipe(required),
  // tesSelect: z.any().superRefine(objectRequired),
  // tesAsyncSelect: z.any().superRefine(objectRequired),
  // tesMedia: z.array(z.any()).superRefine(arrayRequired),
  // tesDate: z.date(),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  // tesInput?: string
  // tesSelect?: OptionType
  // tesAsyncSelect?: OptionType
  // tesMedia?: PustakaMediaFileType[]
  // tesDate?: Date
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
          {/* <ControlledInput
            name="tesInput"
            control={control}
            label="Input"
            placeholder="Input disini"
            errors={errors}
          /> */}
          {/* <ControlledSelect<OptionType>
            name="tesSelect"
            control={control}
            options={options}
            label="Select"
            placeholder="Pilih Satu"
            errors={errors}
            isClearable
          /> */}
          {/* <ControlledAsyncPaginateSelect<OptionType>
            name="tesAsyncSelect"
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
          /> */}
          {/* <ControlledPustakaMedia
            name="tesMedia"
            control={control}
            label="Pilih Berkas"
            errors={errors}
            multiple
          /> */}
          {/* <ControlledDatePicker
            name="tesDate"
            control={control}
            label="Datepicker"
            errors={errors}
          /> */}
          <ButtonSubmit className="flex-1" isSubmitting={isSubmitting}>
            Submit
          </ButtonSubmit>
        </div>
      )}
    </Form>
  )
}
