import { Button, CardSeparator, Modal } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
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
                {...register('judul')}
                error={errors.judul?.message as string}
              />

              <Controller
                control={control}
                name="catatan"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    label="Catatan Tambahan"
                    className="col-span-full [&_.ql-editor]:min-h-[100px]"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
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
