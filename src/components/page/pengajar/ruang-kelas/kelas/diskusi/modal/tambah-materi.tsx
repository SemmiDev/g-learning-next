import { Button, CardSeparator, Modal, Text, TextLabel } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { Controller, SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { Input, Radio, Switch } from 'rizzui'
import { required } from '@/utils/validation'
import { BsInfoCircle } from 'react-icons/bs'

const formSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string(),
  presensi: z.string(),
  tipe_presensi: z.string(),
  penjadwalan: z.coerce.boolean(),
  jadwal: z.coerce.date().optional(),
})

type FormSchema = z.infer<typeof formSchema>

const initialValues: FormSchema = {
  judul: '',
  catatan: '',
  presensi: 'non-aktif',
  tipe_presensi: 'manual',
  penjadwalan: false,
}

export default function TambahMateriModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Bagikan Materi"
      desc="Lampirkan materi yang ingin Kamu bagikan, dapat berupa gambar, video, link video, atau dokumen"
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
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <Input
                label="Judul"
                placeholder="Tulis judul materi di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('judul')}
                error={errors.judul?.message as string}
              />

              <Controller
                control={control}
                name="catatan"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait materi yang diberikan"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              <div>
                <label className="text-gray-dark font-semibold mb-1.5 block">
                  Tambahkan Berkas
                </label>
                <div className="text-gray-lighter text-sm border-2 border-gray-50 rounded-md py-3 px-4">
                  <Button variant="text" className="h-4 p-0">
                    Klik di sini untuk tambah berkas
                  </Button>
                </div>
              </div>

              <div className="flex gap-x-8 mt-2 mb-2">
                <div className="flex items-center space-x-0.5">
                  <TextLabel>Presensi</TextLabel>
                  <BsInfoCircle size={12} />
                </div>
                <Radio
                  label="Aktif"
                  className="[&_.rizzui-radio-field]:cursor-pointer"
                  value="aktif"
                  {...register('presensi')}
                />
                <Radio
                  label="Tidak Aktif"
                  className="[&_.rizzui-radio-field]:cursor-pointer"
                  value="non-aktif"
                  {...register('presensi')}
                />
              </div>

              {watch('presensi') === 'aktif' && (
                <div className="flex mt-2 mb-2">
                  <div className="flex items-center space-x-0.5">
                    <TextLabel>Atur Presensi</TextLabel>
                    <BsInfoCircle size={12} />
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 ml-8">
                    <Radio
                      label="Absensi Manual"
                      className="[&_.rizzui-radio-field]:cursor-pointer"
                      value="manual"
                      {...register('tipe_presensi')}
                    />
                    <Radio
                      label="Absensi Otomatis"
                      className="[&_.rizzui-radio-field]:cursor-pointer"
                      value="otomatis"
                      {...register('tipe_presensi')}
                    />
                  </div>
                </div>
              )}
            </div>

            <CardSeparator />

            <div className="flex gap-x-4 px-3 py-1">
              <Switch label="Opsi Penjadwalan" {...register('penjadwalan')} />
              {watch('penjadwalan', false) && (
                <Input
                  type="datetime-local"
                  placeholder="Atur Tanggal dan Jam Terbit"
                  className="flex-1"
                  labelClassName="text-gray-dark font-semibold"
                  {...register('jadwal')}
                  error={errors.jadwal?.message as string}
                />
              )}
            </div>

            <CardSeparator />

            <div className="flex gap-2 p-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                Bagikan Sekarang
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
