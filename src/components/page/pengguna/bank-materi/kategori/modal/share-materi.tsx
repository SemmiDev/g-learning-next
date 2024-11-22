import { shareMateriBankMateriAction } from '@/actions/pengguna/bank-materi/share-materi'
import {
  CardSeparator,
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
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import {
  BsClipboardPlus,
  BsFileEarmarkRichtext,
  BsInfoCircle,
} from 'react-icons/bs'
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

const optionsPresensi: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

const optionsTipePresensi: RadioGroupOptionType[] = [
  { label: 'Absensi Manual', value: 'manual' },
  { label: 'Absensi Otomatis', value: 'otomatis' },
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
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<ShareMateriFormSchema> = async (data) => {
    const idKelas = data.kelas?.id
    if (!idKelas || !materi) return

    await handleActionWithToast(
      shareMateriBankMateriAction(idKelas, materi, data),
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
      title={`Bagikan ${materi?.type} ke kelas`}
      size="lg"
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
      >
        {({ control, watch, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex space-x-2 border border-dashed border-muted rounded-md p-2">
                <div
                  className={cn(
                    'flex size-11 items-center justify-center rounded-md',
                    {
                      'btn-item-green': materi?.type === 'materi',
                      'btn-item-violet': materi?.type === 'tugas',
                    }
                  )}
                >
                  {materi?.type === 'tugas' ? (
                    <BsClipboardPlus size={22} />
                  ) : (
                    <BsFileEarmarkRichtext size={22} />
                  )}
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
                label={
                  <div className="flex items-center">
                    Presensi
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="flex gap-x-8 my-2"
                groupClassName="gap-x-4 lg:gap-x-8"
                labelClassName="mb-0"
                options={optionsPresensi}
              />

              {watch('presensi') === 'aktif' && (
                <ControlledRadioGroup
                  name="tipe_presensi"
                  control={control}
                  label={
                    <div className="flex items-center text-nowrap">
                      Atur Presensi
                      <BsInfoCircle size={12} className="shrink-0 ml-1" />
                    </div>
                  }
                  className="flex gap-x-8 my-2"
                  groupClassName="flex-wrap gap-x-4 lg:gap-x-8"
                  labelClassName="mb-0"
                  options={optionsTipePresensi}
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
