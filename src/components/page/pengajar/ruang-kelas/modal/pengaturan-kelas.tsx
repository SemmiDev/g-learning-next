import {
  Button,
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledRadioGroupOptions,
  ControlledUploadFile,
  Form,
  Modal,
  ModalFooterButtons,
  TextLabel,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { Controller, SubmitHandler } from 'react-hook-form'
import { BsInfoCircle, BsPlusSquare, BsTrash } from 'react-icons/bs'
import { Input, Select } from 'rizzui'

const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

const formSchema = z.object({
  title: z.string().pipe(required),
  subtitle: z.string().optional(),
  jenis: z.string().pipe(required),
  catatan: z.string().optional(),
  cover: z.any(),
  hariWaktu: z.array(
    z.object({
      hari: z.string().pipe(required),
      waktu: z.string().pipe(required),
    })
  ),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  title?: string
  subtitle?: string
  jenis?: string
  catatan?: string
  cover?: any
  hariWaktu: {
    hari?: string
    waktu?: string
  }[]
}

const initialValues: FormSchema = {
  title: 'Aljabar Linear',
  subtitle: 'TI A',
  jenis: 'Private',
  hariWaktu: [
    {
      hari: 'Senin',
      waktu: '10:30 - 14:45',
    },
    {
      hari: 'Rabu',
      waktu: '11:45 - 15:15',
    },
  ],
}

const optionsJenis: ControlledRadioGroupOptions = [
  { label: 'Publik', value: 'Public' },
  { label: 'Private', value: 'Private' },
  { label: 'Internal', value: 'Internal' },
]

export default function PengaturanKelasModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const optionsHari = HARI.map((hari) => ({
    label: hari,
    value: hari,
  }))

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Pengaturan Kelas"
      size="lg"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({
          register,
          control,
          watch,
          setValue,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="title"
                control={control}
                errors={errors}
                label="Nama Program"
                placeholder="Tulis nama program di sini"
              />

              <ControlledInput
                name="subtitle"
                control={control}
                errors={errors}
                label="Nama Kelas"
                placeholder="Tulis nama kelas di sini"
              />

              <ControlledRadioGroup
                name="jenis"
                control={control}
                options={optionsJenis}
                groupClassName="gap-x-8"
                label={
                  <div className="flex items-center">
                    Jenis Kelas
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
              />

              <div>
                <TextLabel className="block mb-2">Hari dan Waktu</TextLabel>
                <div className="space-y-2">
                  {watch('hariWaktu')?.map((_, idx) => {
                    return (
                      <div key={idx} className="flex gap-x-2">
                        <Controller
                          control={control}
                          name={`hariWaktu.${idx}.hari`}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              placeholder="Pilih nama hari"
                              options={optionsHari}
                              onChange={onChange}
                              value={value}
                              getOptionValue={(option) => option.value}
                              className="flex-1"
                              error={errors.hariWaktu?.[idx]?.hari?.message}
                            />
                          )}
                        />
                        <Input
                          placeholder="Tulis waktu di sini"
                          labelClassName="text-gray-dark font-semibold"
                          className="flex-1"
                          {...register(`hariWaktu.${idx}.waktu`)}
                          error={errors.hariWaktu?.[idx]?.waktu?.message}
                        />
                        <Button
                          size="sm"
                          variant="outline-colorful"
                          color="danger"
                          className="mt-1"
                          onClick={() => {
                            setValue(
                              'hariWaktu',
                              watch('hariWaktu').filter(
                                (__, cIdx) => cIdx !== idx
                              )
                            )
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </div>
                    )
                  })}
                </div>
                <Button
                  variant="text-colorful"
                  onClick={() =>
                    setValue('hariWaktu', [
                      ...watch('hariWaktu'),
                      {
                        hari: '',
                        waktu: '',
                      },
                    ])
                  }
                >
                  <BsPlusSquare className="-ms-2 me-2" /> Tambah Hari dan Waktu
                </Button>
              </div>

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait program dan kelas yg diberikan"
                toolbar="minimalist"
              />

              <ControlledUploadFile
                name="cover"
                control={control}
                errors={errors}
                label="Foto Sampul Kelas"
                accept={{ 'image/*': [] }}
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
