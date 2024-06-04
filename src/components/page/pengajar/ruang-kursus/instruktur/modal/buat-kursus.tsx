import {
  CardSeparator,
  ControlledInput,
  ControlledInputRupiah,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledSelect,
  ControlledSwitch,
  Form,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const baseFs = z.object({
  nama: z.string().pipe(required),
  tipe: z.any().superRefine(objectRequired),
  deskripsi: z.string().optional(),
  cover: z.any(),
  modulUrut: z.boolean(),
})

const isBayarFs = z
  .object({
    bayar: z.literal(true),
    harga: z.string().pipe(required),
  })
  .merge(baseFs)

const isNotBayarFs = z
  .object({
    bayar: z.literal(false),
  })
  .merge(baseFs)

const formSchema = z.union([isBayarFs, isNotBayarFs])

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
  bayar: boolean
  harga?: string
  tipe?: SelectOptionType
  deskripsi?: string
  cover?: any
  modulUrut: boolean
}

const tipeOptions: SelectOptionType[] = [
  { value: 'private', label: 'Private' },
  { value: 'public', label: 'Publik' },
]

const initialValues: FormSchema = {
  bayar: false,
  tipe: tipeOptions.find((opt) => opt.value == 'private'),
  modulUrut: true,
}

export default function BuatKursusModal({
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
      title="Buat Kursus"
      isOpen={showModal}
      size="lg"
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
              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Kursus"
                placeholder="Tulis nama kursus di sini"
              />

              <div className="flex gap-x-4">
                <ControlledSwitch
                  name="bayar"
                  control={control}
                  label="Kursus Berbayar"
                />
                {watch('bayar', false) && (
                  <ControlledInputRupiah
                    name="harga"
                    control={control}
                    errors={errors}
                    placeholder="Masukkan harga kursus di sini"
                    className="flex-1"
                  />
                )}
              </div>

              <ControlledSelect<SelectOptionType>
                name="tipe"
                control={control}
                options={tipeOptions}
                label="Tipe Kursus"
                placeholder="Pilih tipe kursus"
                errors={errors}
              />

              <ControlledQuillEditor
                name="deskripsi"
                control={control}
                errors={errors}
                label="Deskripsi Kursus"
                placeholder="Buat deskripsi singkat terkait kursus"
                toolbar="minimalist"
              />

              <ControlledPustakaMedia
                name="cover"
                control={control}
                label="Cover Kursus"
                errors={errors}
              />

              <ControlledSwitch
                name="modulUrut"
                control={control}
                label="Peserta Harus Menonton Module Secara Berurut"
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Buat Kursus"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
