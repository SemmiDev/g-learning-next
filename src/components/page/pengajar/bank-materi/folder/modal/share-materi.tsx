import {
  CardSeparator,
  ControlledDatePicker,
  ControlledRadioGroup,
  ControlledRadioGroupOptions,
  ControlledSwitch,
  Form,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import {
  BsClipboardPlus,
  BsFileEarmarkRichtext,
  BsInfoCircle,
} from 'react-icons/bs'
import { MateriType } from '../materi-card'
import { BiSolidChevronDown } from 'react-icons/bi'

const baseFs = z.object({
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

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  presensi: string
  tipe_presensi: string
  penjadwalan: boolean
  jadwal?: Date
}

const initialValues: FormSchema = {
  presensi: 'non-aktif',
  tipe_presensi: 'manual',
  penjadwalan: false,
}

const optionsPresensi: ControlledRadioGroupOptions = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

const optionsTipePresensi: ControlledRadioGroupOptions = [
  { label: 'Absensi Manual', value: 'manual' },
  { label: 'Absensi Otomatis', value: 'otomatis' },
]

type ShareMateriModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
  materi?: MateriType
}

export default function ShareMateriModal({
  showModal = false,
  setShowModal,
  materi,
}: ShareMateriModalProps) {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title={`Bagikan ${materi?.type} ke kelas`}
      size="lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      className="[&_.pointer-events-none]:overflow-visible"
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
              <div className="flex space-x-2 border border-dashed border-muted rounded-md p-3">
                <div
                  className={cn(
                    'flex size-11 items-center justify-center rounded-md mr-2',
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
                  <ul className="flex list-inside list-disc gap-3.5">
                    <li className="list-none text-sm text-gray-lighter">
                      {materi?.time}
                    </li>
                    <li className="text-sm text-gray-lighter">
                      {materi?.fileCount} berkas
                    </li>
                  </ul>
                </div>
              </div>

              {/* TODO: Masih Statis */}
              <div>
                <label className="text-gray-dark font-semibold mb-1.5 block">
                  Pilih Kelas
                </label>
                <div className="flex justify-between items-center border border-muted rounded-md p-3">
                  <div className="flex flex-col">
                    <Text size="sm" weight="semibold" variant="dark">
                      Sistem Operasi
                    </Text>
                    <Text size="sm" weight="medium" variant="lighter">
                      Kelas TI A
                    </Text>
                    <Text size="sm" weight="medium" variant="lighter">
                      Nama Instansi
                    </Text>
                  </div>
                  <BiSolidChevronDown size={22} />
                </div>
              </div>

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

              <div className="flex gap-x-4">
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
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
