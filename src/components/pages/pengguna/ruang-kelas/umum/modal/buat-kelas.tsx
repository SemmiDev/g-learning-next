import {
  Button,
  ControlledDatePicker,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledSelect,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
  RadioGroupOptionType,
  SelectOptionType,
  TextLabel,
} from '@/components/ui'
import { NAMA_HARI } from '@/config/const'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahKelasApi } from '@/services/api/pengguna/ruang-kelas/tambah'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption, selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle, BsPlusSquare, BsTrash } from 'react-icons/bs'

const formSchema = z.object({
  program: z.string().pipe(required),
  kelas: z.string().pipe(required),
  tipe: z.string().pipe(required),
  catatan: z.string().optional(),
  cover: z.any(),
  hariWaktu: z.array(
    z.object({
      hari: z.any().superRefine(objectRequired),
      mulai: z.date(),
      sampai: z.date(),
      mulaiWaktu: z.string(),
      sampaiWaktu: z.string(),
      zona: z.any().superRefine(objectRequired),
    })
  ),
})

export type BuatKelasFormSchema = {
  program?: string
  kelas?: string
  tipe?: string
  catatan?: string
  cover?: PustakaMediaFileType
  hariWaktu: {
    hari?: SelectOptionType
    mulai?: Date
    sampai?: Date
    mulaiWaktu?: string
    sampaiWaktu?: string
    zona?: SelectOptionType
  }[]
}

const tipeOptions: RadioGroupOptionType[] = [
  radioGroupOption('Publik'),
  radioGroupOption('Privat'),
]

const hariOptions: SelectOptionType[] = NAMA_HARI.map((hari) => ({
  label: hari,
  value: hari,
}))

const zonaWaktuOptions: SelectOptionType[] = [
  selectOption('WIB'),
  selectOption('WITA'),
  selectOption('WIT'),
]

const initialValues: BuatKelasFormSchema = {
  tipe: tipeOptions[0].value,
  hariWaktu: [],
}

type BuatKelasModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function BuatKelasModal({
  showModal = false,
  setShowModal,
}: BuatKelasModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<BuatKelasFormSchema> = async (data) => {
    await handleActionWithToast(processApi(tambahKelasApi, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.list'],
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
      title="Buat Kelas Baru"
      size={size}
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={showModal}
      onClose={handleClose}
    >
      <Form<BuatKelasFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({
          control,
          watch,
          setValue,
          formState: { errors, isSubmitting },
        }) => {
          return (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="program"
                  control={control}
                  errors={errors}
                  label="Nama Program"
                  placeholder="Tulis nama program di sini"
                  required
                />

                <ControlledInput
                  name="kelas"
                  control={control}
                  errors={errors}
                  label="Nama Kelas"
                  placeholder="Tulis nama kelas di sini"
                  required
                />

                <ControlledRadioGroup
                  name="tipe"
                  control={control}
                  options={tipeOptions}
                  errors={errors}
                  groupClassName="gap-x-8"
                  label={
                    <div className="flex items-center">
                      Tipe Kelas
                      <BsInfoCircle size={12} className="ml-1" />
                    </div>
                  }
                />

                <div>
                  <TextLabel>Hari dan Waktu</TextLabel>
                  <div className="flex flex-col gap-y-2">
                    {watch('hariWaktu')?.map((_, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-x-2 gap-y-1 border-b border-b-muted last:border-b-0 pb-2 sm:flex-row sm:border-0 sm:pb-0"
                      >
                        <ControlledSelect
                          control={control}
                          name={`hariWaktu.${idx}.hari`}
                          options={hariOptions}
                          placeholder="Pilih nama hari"
                        />
                        <div className="flex flex-col flex-2 gap-y-1 sm:flex-row">
                          <ControlledDatePicker
                            control={control}
                            name={`hariWaktu.${idx}.mulai`}
                            inputProps={{
                              error:
                                errors['hariWaktu']?.[idx]?.['mulai']?.message,
                            }}
                            onChange={(val) =>
                              setValue(
                                `hariWaktu.${idx}.mulaiWaktu`,
                                moment(val).format('HH:mm')
                              )
                            }
                            placeholder="Mulai"
                            className="flex-1 sm:[&_.rizzui-input-container]:rounded-r-none"
                            dateFormat={'HH:mm'}
                            timeFormat="HH:mm"
                            showTimeSelect
                            showTimeSelectOnly
                          />
                          <ControlledDatePicker
                            control={control}
                            name={`hariWaktu.${idx}.sampai`}
                            inputProps={{
                              error:
                                errors['hariWaktu']?.[idx]?.['sampai']?.message,
                            }}
                            onChange={(val) =>
                              setValue(
                                `hariWaktu.${idx}.sampaiWaktu`,
                                moment(val).format('HH:mm')
                              )
                            }
                            placeholder="Sampai"
                            className="flex-1 sm:[&_.rizzui-input-container]:rounded-none"
                            dateFormat={'HH:mm'}
                            timeFormat="HH:mm"
                            showTimeSelect
                            showTimeSelectOnly
                          />
                          <ControlledSelect
                            control={control}
                            name={`hariWaktu.${idx}.zona`}
                            options={zonaWaktuOptions}
                            placeholder="Zona"
                            className="w-24"
                            classNames={{ control: 'sm:rounded-l-none' }}
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="outline-colorful"
                          color="danger"
                          className="mt-1"
                          onClick={() => {
                            setValue(
                              'hariWaktu',
                              watch('hariWaktu').filter(
                                (__, cIdx) => cIdx !== idx
                              )
                            )
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="text-colorful"
                    onClick={() =>
                      setValue('hariWaktu', [
                        ...watch('hariWaktu'),
                        {
                          hari: undefined,
                          mulai: undefined,
                          sampai: undefined,
                          mulaiWaktu: '',
                          sampaiWaktu: '',
                          zona: selectOption('WIB'),
                        },
                      ])
                    }
                  >
                    <BsPlusSquare className="-ms-2 me-2" /> Tambah Hari dan
                    Waktu
                  </Button>
                </div>

                <ControlledQuillEditor
                  name="catatan"
                  control={control}
                  errors={errors}
                  label="Catatan Tambahan"
                  placeholder="Buat catatan singkat terkait program dan kelas yg diberikan"
                  toolbar="minimalist"
                  size="xs"
                />

                <ControlledPustakaMedia
                  name="cover"
                  control={control}
                  label="Foto Sampul Kelas"
                  errors={errors}
                  types={['folder', 'image']}
                />

                <FormError error={formError} />
              </div>

              <ModalFooterButtons
                submit="Simpan"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
                borderTop
              />
            </>
          )
        }}
      </Form>
    </Modal>
  )
}
