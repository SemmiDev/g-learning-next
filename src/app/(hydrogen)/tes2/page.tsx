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
import {
  arrayRequired,
  maxUploadFileSize,
  objectRequired,
} from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { Controller, SubmitHandler } from 'react-hook-form'
import { tesAsyncAction } from './action'
import Materi from '@/components/ui/materi/materi'
import { MateriItemType } from '@/components/ui/materi/materi-button'
import UploadFile, {
  UploadFileType,
} from '@/components/ui/upload-file/upload-file'

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
  // tesMateri: z.any().superRefine(objectRequired),
  // tesDate: z.date(),
  tesFiles: z.array(z.any()).superRefine(arrayRequired),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  // tesInput?: string
  // tesSelect?: OptionType
  // tesAsyncSelect?: OptionType
  // tesMedia?: PustakaMediaFileType[]
  // tesMateri?: MateriItemType
  // tesDate?: Date
  tesFiles?: UploadFileType[]
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
          <Controller
            name="tesFiles"
            control={control}
            render={({ field: { onChange } }) => (
              <UploadFile
                desc="(Tipe berkas yang bisa di-upload adalah: xls, xlsx dengan ukuran
              maksimal 10 MB untuk setiap berkas yang dipilih)"
                onChange={onChange}
                maxSize={{ size: 100, metric: 'KB' }}
                multiple
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
