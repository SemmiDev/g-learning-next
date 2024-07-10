'use client'

import {
  ButtonSubmit,
  ControlledInput,
  ControlledInputRupiah,
  ControlledSelect,
  ControlledUploadFile,
  Form,
  UploadFileType,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { arrayRequired, objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { Controller, SubmitHandler } from 'react-hook-form'

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
  tesNumber: z.string().pipe(required),
  // tesSelect: z.any().superRefine(objectRequired),
  // tesAsyncSelect: z.any().superRefine(objectRequired),
  // tesMedia: z.array(z.any()).superRefine(arrayRequired),
  // tesMateri: z.any().superRefine(objectRequired),
  // tesDate: z.date(),
  // tesFiles: z.array(z.any()).superRefine(arrayRequired),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  // tesInput?: string
  tesNumber?: number | string
  // tesSelect?: OptionType
  // tesAsyncSelect?: OptionType
  // tesMedia?: PustakaMediaFileType[]
  // tesMateri?: MateriItemType
  // tesDate?: Date
  // tesFiles?: UploadFileType[]
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
          <ControlledInputRupiah
            name="tesNumber"
            control={control}
            errors={errors}
            label="Tes Label"
          />
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
          {/* <Controller
            name="tesMateri"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Materi label="Pilih Materi" value={value} onChange={onChange} />
            )}
          /> */}
          {/* <ControlledDatePicker
            name="tesDate"
            control={control}
            label="Datepicker"
            errors={errors}
          /> */}
          {/* <ControlledUploadFile
            name="tesFiles"
            control={control}
            desc="(Tipe berkas yang bisa di-upload adalah: xls, xlsx dengan ukuran
              maksimal 10 MB untuk setiap berkas yang dipilih)"
            maxSize={{ size: 100, metric: 'MB' }}
            errors={errors}
            multiple
          /> */}
          <ButtonSubmit className="flex-1" isSubmitting={isSubmitting}>
            Submit
          </ButtonSubmit>
        </div>
      )}
    </Form>
  )
}
