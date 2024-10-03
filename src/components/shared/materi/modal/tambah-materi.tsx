import { tambahMateriAction } from '@/actions/shared/materi/tambah'
import {
  CardSeparator,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
  RadioGroupOptionType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  tipe: z.string(),
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

export type TambahMateriFormSchema = {
  tipe: string
  judul?: string
  catatan?: string
  berkas: PustakaMediaFileType[]
}

const options: RadioGroupOptionType[] = [
  radioGroupOption('Materi'),
  { value: 'Penugasan', label: 'Tugas' },
]

const initialValues: TambahMateriFormSchema = {
  tipe: 'Materi',
  berkas: [],
}

type TambahMateriModalProps = {
  idKategori: string | undefined
  setIdKategori(id?: string): void
}

export default function TambahMateriModal({
  idKategori,
  setIdKategori,
}: TambahMateriModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahMateriFormSchema> = async (data) => {
    if (!idKategori) return

    await handleActionWithToast(tambahMateriAction(idKategori, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setIdKategori(undefined)
        queryClient.invalidateQueries({
          queryKey: ['shared.materi.list', idKategori],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setIdKategori(undefined)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Tambah Materi Baru"
      desc="Buat materi ajar terkait kelas yang kamu kelola"
      size="lg"
      isOpen={!!idKategori}
      onClose={handleClose}
    >
      <Form<TambahMateriFormSchema>
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
              <ControlledRadioGroup
                name="tipe"
                control={control}
                options={options}
                label="Tipe"
                errors={errors}
                required
              />

              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Materi"
                placeholder="Tulis judul materi di sini"
                required
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

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Tambah Materi"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
