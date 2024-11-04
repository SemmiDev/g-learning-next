import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { ubahKelasAction } from '@/actions/pengguna/ruang-kelas/ubah'
import {
  Button,
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
  RadioGroupOptionType,
  SelectOptionType,
  TextLabel,
  TextSpan,
} from '@/components/ui'
import { NAMA_HARI, ZONA_WAKTU } from '@/config/const'
import { handleActionWithToast } from '@/utils/action'
import { parseDateFromTime } from '@/utils/date'
import { mustBe } from '@/utils/must-be'
import { radioGroupOption, selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle, BsPlusSquare, BsTrash } from 'react-icons/bs'

const formSchema = z.object({
  program: z.string().pipe(required),
  kelas: z.string().optional(),
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

export type PengaturanKelasFormSchema = {
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

type PengaturanKelasModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function PengaturanKelasModal({
  id,
  show,
  onHide,
}: PengaturanKelasModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['pengguna.ruang-kelas.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<PengaturanKelasFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id)
        return {
          hariWaktu: [],
        }

      const { data } = await lihatKelasAction(id)

      return {
        program: data?.kelas?.nama_kelas,
        kelas: data?.kelas?.sub_judul,
        catatan: data?.kelas?.deskripsi,
        tipe: data?.kelas?.tipe,
        hariWaktu: (data?.jadwal ?? []).map((item) => ({
          hari: selectOption(mustBe(item.hari, NAMA_HARI, 'Senin')),
          mulai: parseDateFromTime(item.waktu_mulai),
          sampai: parseDateFromTime(item.waktu_sampai),
          mulaiWaktu: item.waktu_mulai,
          sampaiWaktu: item.waktu_sampai,
          zona: selectOption(mustBe(item.zona_waktu, ZONA_WAKTU, 'WIB')),
        })),
      }
    },
  })

  const onSubmit: SubmitHandler<PengaturanKelasFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahKelasAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.lihat', id],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: PengaturanKelasFormSchema) => ({
            ...oldData,
            ...data,
          })
        )
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Pengaturan Kelas"
      isLoading={!isLoading && isFetching}
      size="lg"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading || !id ? (
        <Loader height={450} />
      ) : (
        <Form<PengaturanKelasFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({
            control,
            watch,
            setValue,
            formState: { errors, isSubmitting },
          }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="program"
                  control={control}
                  errors={errors}
                  label="Nama Program"
                  placeholder="Tulis nama program di sini"
                />

                <ControlledInput
                  name="kelas"
                  control={control}
                  errors={errors}
                  label="Nama Kelas"
                  placeholder="Tulis nama kelas di sini"
                />

                <ControlledRadioGroup
                  name="tipe"
                  control={control}
                  options={tipeOptions}
                  groupClassName="gap-x-8"
                  label={
                    <div className="flex items-center">
                      Tipe Kelas
                      <BsInfoCircle size={12} className="ml-1" />
                    </div>
                  }
                />

                <div>
                  <TextLabel className="block mb-2">Hari dan Waktu</TextLabel>
                  <div className="space-y-2">
                    {watch('hariWaktu')?.map((_, idx) => (
                      <div key={idx} className="flex gap-x-2">
                        <ControlledSelect
                          control={control}
                          name={`hariWaktu.${idx}.hari`}
                          options={hariOptions}
                          placeholder="Pilih nama hari"
                        />
                        <div className="flex flex-2">
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
                            className="flex-1 [&_.rizzui-input-container]:rounded-r-none"
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
                            className="flex-1 [&_.rizzui-input-container]:rounded-none"
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
                            classNames={{ control: 'rounded-l-none' }}
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
                  label={
                    <TextSpan>
                      Foto Sampul Kelas{' '}
                      <small>(Kosongkan jika tidak ingin mengganti)</small>
                    </TextSpan>
                  }
                  errors={errors}
                  types={['folder', 'image']}
                />

                <FormError error={formError} />
              </div>

              <CardSeparator />

              <ModalFooterButtons
                submit="Simpan"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
