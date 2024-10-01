import { tambahAktifitasMateriAction } from '@/actions/pengguna/ruang-kelas/aktifitas/tambah-materi'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledMateri,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledSwitch,
  Form,
  FormError,
  MateriItemType,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
  RadioGroupOptionType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'

const baseFs = z.object({
  presensi: z.string(),
  tipe_presensi: z.string(),
})

const isShareFs = z
  .object({
    share: z.literal(true),
    materi: z.any().superRefine(objectRequired),
  })
  .merge(baseFs)

const isNotShareFs = z
  .object({
    share: z.literal(false),
    judul: z.string().pipe(required),
    catatan: z.string().optional(),
    berkas: z.array(z.any()),
  })
  .merge(baseFs)

const isPenjadwalanFs = z.object({
  penjadwalan: z.literal(true),
  jadwal: z.date(),
})

const isNotPenjadwalanFs = z.object({
  penjadwalan: z.literal(false),
})

const formSchema = z.union([
  isShareFs.merge(isPenjadwalanFs),
  isShareFs.merge(isNotPenjadwalanFs),
  isNotShareFs.merge(isPenjadwalanFs),
  isNotShareFs.merge(isNotPenjadwalanFs),
])

export type TambahMateriFormSchema = {
  share: boolean
  materi?: MateriItemType
  judul?: string
  catatan?: string
  presensi: string
  tipe_presensi: string
  penjadwalan: boolean
  jadwal?: Date
  berkas?: PustakaMediaFileType[]
}

const initialValues: TambahMateriFormSchema = {
  presensi: 'non-aktif',
  tipe_presensi: 'Manual',
  penjadwalan: false,
  share: true,
  berkas: [],
}

const optionsPresensi: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

const optionsTipePresensi: RadioGroupOptionType[] = [
  { label: 'Absensi Manual', value: 'Manual' },
  { label: 'Absensi Otomatis', value: 'Otomatis' },
]

export default function TambahMateriModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahMateriFormSchema> = async (data) => {
    await handleActionWithToast(tambahAktifitasMateriAction(idKelas, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.list'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShowModal(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan Materi"
      desc="Lampirkan materi yang ingin Kamu bagikan, dapat berupa gambar, video, link video, atau dokumen"
      size="lg"
      isOpen={showModal}
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
                </>
              )}

              <ControlledRadioGroup
                name="presensi"
                control={control}
                label={
                  <div className="flex items-center">
                    Presensi
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="flex gap-8 my-2"
                groupClassName="gap-8"
                labelClassName="mb-0"
                options={optionsPresensi}
              />

              {watch('presensi') === 'aktif' && (
                <ControlledRadioGroup
                  name="tipe_presensi"
                  control={control}
                  label={
                    <div className="flex items-center">
                      Atur Presensi
                      <BsInfoCircle size={12} className="ml-1" />
                    </div>
                  }
                  className="flex gap-8 my-2"
                  groupClassName="gap-8"
                  labelClassName="mb-0"
                  options={optionsTipePresensi}
                />
              )}
            </div>

            <CardSeparator />

            <div className="flex gap-x-4 px-3 py-3">
              <ControlledSwitch
                name="penjadwalan"
                control={control}
                label="Opsi Penjadwalan"
              />
              {watch('penjadwalan', false) && (
                <ControlledDatePicker
                  name="jadwal"
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

            <div className="px-3">
              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
