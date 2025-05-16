import {
  ControlledDatePicker,
  ControlledInput,
  ControlledMateri,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledSwitch,
  Form,
  FormError,
  MateriItemType,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahAktifitasTugasSesiApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/sesi/tambah-tugas'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
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

export type TambahTugasSesiFormSchema = {
  share: boolean
  materi?: MateriItemType
  judul?: string
  catatan?: string
  dibatasiWaktu: boolean
  batasWaktu?: Date
  berkas?: PustakaMediaFileType[]
}

const initialValues: TambahTugasSesiFormSchema = {
  dibatasiWaktu: false,
  share: true,
  berkas: [],
}

type TambahTugasSesiModalProps = {
  idSesi: string | undefined
  show?: boolean
  onHide: () => void
}

export default function TambahTugasSesiModal({
  idSesi,
  show = false,
  onHide,
}: TambahTugasSesiModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahTugasSesiFormSchema> = async (data) => {
    if (!idSesi) return

    await handleActionWithToast(
      processApi(tambahAktifitasTugasSesiApi, idKelas, idSesi, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'pengguna.ruang-kelas.sesi-pembelajaran.bahan-ajar.list',
              idKelas,
              idSesi,
            ],
          })
          queryClient.invalidateQueries({
            queryKey: [
              'pengguna.ruang-kelas.sesi-pembelajaran.list',
              'pengajar',
              idKelas,
            ],
          })
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list-jadwal-kelas'],
          })
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
          })
          onHide()
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan Tugas"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahTugasSesiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({ control, watch, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col">
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
                    type="tugas"
                  />
                ) : (
                  <>
                    <ControlledInput
                      name="judul"
                      control={control}
                      errors={errors}
                      label="Judul Tugas"
                      placeholder="Tulis judul tugas di sini"
                      required
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

                <div className="flex gap-x-4 gap-y-1 flex-wrap">
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
                      placeholder="Atur Tanggal dan Jam Batas Waktu"
                      showTimeSelect
                      dateFormat="dd MMMM yyyy HH:mm"
                      timeFormat="HH:mm"
                      className="flex-1 min-w-72"
                    />
                  )}
                </div>
              </div>

              <div className="px-3">
                <FormError error={formError} />
              </div>
            </div>

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
