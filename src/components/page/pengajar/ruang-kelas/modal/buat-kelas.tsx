import { Button, CardSeparator, Modal, Text, TextLabel } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { required } from '@/utils/validations/pipe'
import {
  fileRequired,
  imageFileOnly,
  maxFileSize,
} from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { Controller, SubmitHandler } from 'react-hook-form'
import { BsInfoCircle, BsPlusSquare, BsTrash } from 'react-icons/bs'
import { ActionIcon, FileInput, Input, Radio, Select } from 'rizzui'

const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu']

const formSchema = z.object({
  title: z.string().pipe(required),
  subtitle: z.string(),
  jenis: z.string().pipe(required),
  catatan: z.string(),
  cover: z
    .any()
    .superRefine(maxFileSize({ max: 5, metric: 'MB', desc: 'gambar' }))
    .superRefine(imageFileOnly),
  hariWaktu: z.array(
    z.object({
      hari: z.string(),
      waktu: z.string(),
    })
  ),
})

type FormSchema = z.infer<typeof formSchema>

const initialValues: FormSchema = {
  title: '',
  subtitle: '',
  jenis: 'Public',
  catatan: '',
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

export default function BuatKelasModal({
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
      title="Buat Kelas Baru"
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
              <Input
                label="Nama Program"
                placeholder="Tulis nama program di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('title')}
                error={errors.title?.message as string}
              />

              <Input
                label="Nama Kelas"
                placeholder="Tulis nama kelas di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('subtitle')}
                error={errors.subtitle?.message as string}
              />

              <div>
                <div className="flex items-center space-x-0.5 mb-2">
                  <TextLabel>Jenis Kelas</TextLabel>
                  <BsInfoCircle size={12} />
                </div>
                <div className="flex gap-x-8">
                  <Radio
                    label="Publik"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="Public"
                    {...register('jenis')}
                  />
                  <Radio
                    label="Private"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="Private"
                    {...register('jenis')}
                  />
                  <Radio
                    label="Internal"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="Internal"
                    {...register('jenis')}
                  />
                </div>
              </div>

              <div className="mb-4">
                <TextLabel className="block mb-2">Hari dan Waktu</TextLabel>
                <div className="space-y-2">
                  {watch('hariWaktu')?.map((_, idx) => {
                    return (
                      <div key={idx} className="flex items-center gap-x-2">
                        <Controller
                          control={control}
                          name={`hariWaktu.${idx}.hari`}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              options={optionsHari}
                              onChange={onChange}
                              value={value}
                              getOptionValue={(option) => option.value}
                              className="flex-1"
                            />
                          )}
                        />
                        <Input
                          labelClassName="text-gray-dark font-semibold"
                          className="flex-1"
                          {...register(`hariWaktu.${idx}.waktu`)}
                        />
                        <Button
                          size="sm"
                          variant="outline-colorful"
                          color="danger"
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

              <Controller
                control={control}
                name="catatan"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait program dan kelas yg diberikan"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              <FileInput
                label="Foto Sampul Kelas"
                variant="outline"
                accept="image/*"
                {...register('cover')}
                error={errors.cover?.message as string}
              />
            </div>

            <CardSeparator />

            <div className="flex gap-2 p-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                Simpan
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
              >
                Batal
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  )
}
