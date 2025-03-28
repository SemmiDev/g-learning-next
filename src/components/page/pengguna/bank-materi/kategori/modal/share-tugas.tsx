import { shareTugasBankMateriAction } from '@/actions/pengguna/bank-materi/share-tugas'
import {
  ControlledDatePicker,
  ControlledKelas,
  ControlledSwitch,
  Form,
  FormError,
  KelasItemType,
  MateriItemType,
  Modal,
  ModalFooterButtons,
  Text,
  Time,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsClipboardPlus, BsFileEarmarkRichtext } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'

const baseFs = z.object({
  kelas: z.any().superRefine(objectRequired),
})

const formSchema = z.discriminatedUnion('dibatasiWaktu', [
  z
    .object({
      dibatasiWaktu: z.literal(false),
    })
    .merge(baseFs),
  z
    .object({
      dibatasiWaktu: z.literal(true),
      batasWaktu: z.date(),
    })
    .merge(baseFs),
])

export type ShareTugasFormSchema = {
  kelas?: KelasItemType
  dibatasiWaktu: boolean
  batasWaktu?: Date
}

const initialValues: ShareTugasFormSchema = {
  dibatasiWaktu: false,
}

type ShareTugasModalProps = {
  materi: MateriItemType | undefined
  show: boolean
  onHide: () => void
}

export default function ShareTugasModal({
  materi,
  show,
  onHide,
}: ShareTugasModalProps) {
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<ShareTugasFormSchema> = async (data) => {
    const idKelas = data.kelas?.id
    if (!idKelas || !materi) return

    await handleActionWithToast(
      shareTugasBankMateriAction(idKelas, materi, data),
      {
        loading: 'Membagikan tugas...',
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
      <Form<ShareTugasFormSchema>
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
              <div className="flex gap-x-2 border border-dashed border-muted rounded-md p-2">
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

              <div className="flex gap-x-4">
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
                    className="flex-1"
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
