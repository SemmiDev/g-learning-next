import { Button, CardSeparator, Modal } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { Controller, SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { Input } from 'rizzui'
import { required } from '@/utils/validation'

const formSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

const initialValues: FormSchema = {
  judul: '',
  catatan: '',
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
        {({ register, control, formState: { errors, isSubmitting } }) => (
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
