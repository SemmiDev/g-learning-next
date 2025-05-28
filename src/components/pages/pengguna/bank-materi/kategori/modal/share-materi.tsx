import {
  ControlledDatePicker,
  ControlledKelas,
  ControlledRadioGroup,
  ControlledSwitch,
  Form,
  FormError,
  KelasItemType,
  MateriItemType,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
  Text,
  Time,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { shareMateriBankMateriApi } from '@/services/api/pengguna/bank-materi/share-materi'
import { handleActionWithToast } from '@/utils/action'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsFileEarmarkRichtext, BsInfoCircle } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'

const baseFs = z.object({
  kelas: z.any().superRefine(objectRequired),
  presensi: z.string(),
  tipe_presensi: z.string(),
})

const formSchema = z.discriminatedUnion('penjadwalan', [
  z
    .object({
      penjadwalan: z.literal(false),
    })
    .merge(baseFs),
  z
    .object({
      penjadwalan: z.literal(true),
      jadwal: z.date(),
    })
    .merge(baseFs),
])

export type ShareMateriFormSchema = {
  kelas?: KelasItemType
  presensi: string
  tipe_presensi: string
  penjadwalan: boolean
  jadwal?: Date
}

const initialValues: ShareMateriFormSchema = {
  presensi: 'non-aktif',
  tipe_presensi: 'manual',
  penjadwalan: false,
}

const presensiOptions: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

const tipePresensiOptions: RadioGroupOptionType[] = [
  { label: 'Presensi Manual', value: 'manual' },
  { label: 'Presensi Otomatis', value: 'otomatis' },
]

type ShareMateriModalProps = {
  materi: MateriItemType | undefined
  show: boolean
  onHide: () => void
}

export default function ShareMateriModal({
  materi,
  show,
  onHide,
}: ShareMateriModalProps) {
  const { processApi } = useSessionJwt()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<ShareMateriFormSchema> = async (data) => {
    const idKelas = data.kelas?.id
    if (!idKelas || !materi) return

    await handleActionWithToast(
      processApi(shareMateriBankMateriApi, idKelas, materi, data),
      {
        loading: `Membagikan ${materi?.type}...`,
        onStart: () => setFormError(undefined),
        onSuccess: () => onHide(),
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
      title={`Bagikan materi ke kelas`}
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<ShareMateriFormSchema>
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
            <div className="flex flex-col gap-4 p-3">
              <div className="flex gap-x-2 border border-dashed border-muted rounded-md p-2">
                <div className="flex size-11 items-center justify-center rounded-md btn-item-green">
                  <BsFileEarmarkRichtext size={22} />
                </div>
                <div className="flex flex-col">
                  <Text
                    weight="semibold"
                    variant="dark"
                    title={materi?.name}
                    className="truncate"
                  >
                    {materi?.name}
                  </Text>
                  <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
                    <li>
                      <Time date={materi?.time} />
                    </li>
                    <li>
                      <GoDotFill size={10} />
                    </li>
                    <li>{materi?.fileCount} berkas</li>
                  </ul>
                </div>
              </div>

              <ControlledKelas
                name="kelas"
                control={control}
                errors={errors}
                label="Pilih Kelas"
                type="Pengajar"
                required
              />

              <ControlledRadioGroup
                name="presensi"
                control={control}
                errors={errors}
                label="Presensi"
                className="flex gap-x-8 my-2"
                groupClassName="gap-x-4 lg:gap-x-8"
                labelClassName="mb-0"
                options={presensiOptions}
              />

              {watch('presensi') === 'aktif' && (
                <ControlledRadioGroup
                  name="tipe_presensi"
                  control={control}
                  label="Atur Presensi"
                  className="flex gap-x-8 my-2"
                  groupClassName="flex-wrap gap-x-4 lg:gap-x-8"
                  labelClassName="mb-0"
                  options={tipePresensiOptions}
                />
              )}

              <div className="flex flex-wrap gap-x-4">
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
                    className="flex-1 min-w-[260px]"
                  />
                )}
              </div>

              <FormError error={formError} />
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
