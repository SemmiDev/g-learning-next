import {
  CardSeparator,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  Form,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  judul?: string
  catatan?: string
  berkas?: PustakaMediaFileType[]
}

const initialValues: FormSchema = {}

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
      title="Tambah Materi Baru"
      desc="Buat materi ajar terkait kelas yang kamu kelola"
      size="lg"
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
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Materi"
                placeholder="Tulis judul materi di sini"
              />

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait materi yang diberikan"
                toolbar="minimalist"
              />

              <ControlledPustakaMedia
                name="berkas"
                control={control}
                label="Pilih Berkas"
                errors={errors}
                multiple
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Tambah Materi"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
