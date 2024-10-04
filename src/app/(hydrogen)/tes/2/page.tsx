'use client'

import {
  ButtonSubmit,
  ControlledAsyncPaginateSelect,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputNumber,
  ControlledInputNumberSeparator,
  ControlledInputRupiah,
  ControlledMateri,
  ControlledPaketSoal,
  ControlledPustakaMedia,
  ControlledSelect,
  ControlledSwitch,
  ControlledTextarea,
  ControlledUploadFile,
  Form,
  Materi,
  MateriItemType,
  PaketSoalItemType,
  PustakaMediaFileType,
  SelectOptionType,
  UploadFileType,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { arrayRequired, objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { Controller, SubmitHandler } from 'react-hook-form'
import { tesAsyncAction } from './action'
import { parseNumber } from '@/utils/parse-number'
import AsyncPaginateSelect from '@/components/ui/select/async-paginate'
import { inputToNumber } from '@/utils/validations/transform'
import { NumberInput } from 'rizzui'

const options: SelectOptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const formSchema = z.object({
  // tesInput: z.string().optional(),
  // tesTextarea: z.string().pipe(required),
  // tesInputNumber: z.number().nullish(),
  // tesInputPhone: z.string().optional(),
  // tesNumber: z.number().nullish(),
  // tesRupiah: z.string().pipe(required),
  // tesSelect: z.any().superRefine(objectRequired),
  // tesAsyncSelect: z.any().superRefine(objectRequired),
  // tesMedia: z.array(z.any()).superRefine(arrayRequired),
  // tesMateri: z.any().superRefine(objectRequired),
  // tesSoal: z.any().superRefine(objectRequired),
  // tesDate: z.date(),
  // tesFiles: z.array(z.any()).superRefine(arrayRequired),
  // tesSwitch: z.boolean(),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  // tesInput?: string
  // tesTextarea?: string
  // tesInputNumber?: number | null
  // tesInputPhone?: string
  // tesNumber?: number | null
  // tesRupiah?: number | string
  // tesSelect?: SelectOptionType
  // tesAsyncSelect?: SelectOptionType
  // tesMedia?: PustakaMediaFileType[]
  // tesMateri?: MateriItemType
  // tesSoal?: PaketSoalItemType
  // tesDate?: Date
  // tesFiles?: UploadFileType[]
  // tesSwitch: boolean
}

const initialValues: FormSchema = {
  // tesInputNumber: 900,
  // tesNumber: 900,
}

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
          {/* <ControlledTextarea
            name="tesTextarea"
            control={control}
            label="Textarea"
            placeholder="Textarea disini"
            errors={errors}
            required
          /> */}
          {/* <ControlledInputNumber
            name="tesInputNumber"
            control={control}
            label="Input Number"
            placeholder="Input disini"
            errors={errors}
          /> */}
          {/* <ControlledInput
            name="tesInputPhone"
            control={control}
            type="number"
            label="Input Phone"
            placeholder="Input disini"
            errors={errors}
            phoneNumber
          /> */}
          {/* <ControlledInputNumberSeparator
            name="tesNumber"
            control={control}
            errors={errors}
            label="Tes Number"
            placeholder="Input disini"
          /> */}
          {/* <ControlledInputRupiah
            name="tesRupiah"
            control={control}
            errors={errors}
            label="Tes Rupiah"
          /> */}
          {/* <ControlledSelect
            name="tesSelect"
            control={control}
            options={options}
            label="Select"
            placeholder="Pilih Satu"
            errors={errors}
            isClearable
          /> */}
          {/* <ControlledAsyncPaginateSelect
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
          {/* <ControlledMateri
            name="tesMateri"
            control={control}
            label="Pilih Materi"
            errors={errors}
          /> */}
          {/* <ControlledPaketSoal
            name="tesSoal"
            control={control}
            label="Pilih Paket Soal"
            errors={errors}
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
            maxSize={{ size: 100, unit: 'MB' }}
            errors={errors}
            multiple
          /> */}
          {/* <ControlledSwitch
            name="tesSwitch"
            control={control}
            label="Tes Switch"
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
