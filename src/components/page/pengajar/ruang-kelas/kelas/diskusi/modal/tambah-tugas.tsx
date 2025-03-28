import {
  ControlledDatePicker,
  ControlledInput,
  ControlledMateri,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledSwitch,
  Form,
  MateriItemType,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const isShareFs = z.object({
  share: z.literal(true),
  materi: z.any().superRefine(objectRequired),
})

const isNotShareFs = z.object({
  share: z.literal(false),
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

const isDibatasiWaktuFs = z.object({
  dibatasiWaktu: z.literal(true),
  batasWaktu: z.date(),
})

const isNotDibatasiWaktuFs = z.object({
  dibatasiWaktu: z.literal(false),
})

const formSchema = z.union([
  isShareFs.merge(isDibatasiWaktuFs),
  isShareFs.merge(isNotDibatasiWaktuFs),
  isNotShareFs.merge(isDibatasiWaktuFs),
  isNotShareFs.merge(isNotDibatasiWaktuFs),
])

type FormSchema = {
  share: boolean
  materi?: MateriItemType
  judul?: string
  catatan?: string
  dibatasiWaktu: boolean
  batasWaktu?: Date
  berkas?: PustakaMediaFileType[]
}

const initialValues: FormSchema = {
  dibatasiWaktu: false,
  share: true,
}

export default function TambahTugasModal({
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
      title="Bagikan Tugas"
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
        {({ control, watch, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledSwitch
                name="share"
                control={control}
                label="Bagikan dari Bank Materi"
              />

              {watch('share') ? (
                <ControlledMateri
                  name="materi"
                  control={control}
                  errors={errors}
                />
              ) : (
                <>
                  <ControlledInput
                    name="judul"
                    control={control}
                    errors={errors}
                    label="Judul Tugas"
                    placeholder="Tulis judul tugas di sini"
                  />

                  <ControlledQuillEditor
                    name="catatan"
                    control={control}
                    errors={errors}
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait tugas yang diberikan"
                    toolbar="minimalist"
                  />

                  <ControlledPustakaMedia
                    name="berkas"
                    control={control}
                    label="Pilih Berkas"
                    errors={errors}
                    multiple
                  />
                </>
              )}

              <div className="flex gap-x-4 px-3 py-3">
                <ControlledSwitch
                  name="dibatasiWaktu"
                  control={control}
                  label="Opsi Batas Waktu Penyerahan"
                />
                {watch('dibatasiWaktu', false) && (
                  <ControlledDatePicker
                    name="batasWaktu"
                    control={control}
                    errors={errors}
                    placeholder="Atur Tanggal dan Jam Terbit"
                    showTimeSelect
                    dateFormat="dd MMMM yyyy HH:mm"
                    timeFormat="HH:mm"
                    className="flex-1"
                  />
                )}
              </div>
            </div>

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
