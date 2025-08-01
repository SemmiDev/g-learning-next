import {
  AdvancedRadioGroupOptionType,
  ControlledAdvancedRadioGroup,
  ControlledInput,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
  Text,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataKoneksiAkunApi } from '@/services/api/pengguna/koneksi-akun/data'
import { tambahAktifitasKonferensiSesiApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/sesi/tambah-konferensi'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import googleMeetIcon from '@public/icons/google-meet.png'
import zoomIcon from '@public/icons/zoom.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    judul: z.string().pipe(required),
    catatan: z.string().optional(),
    tipeLink: z.string(),
    link: z.string().optional(),
    generateLink: z.string().optional(),
  })
  .refine((data) => data.tipeLink !== 'manual' || !!data.link, {
    message: 'Link wajib diisi',
    path: ['link'],
  })
  .refine(
    (data) =>
      data.tipeLink !== 'manual' ||
      z.string().url().safeParse(data.link).success,
    {
      message: 'Format url tidak valid',
      path: ['link'],
    }
  )
  .refine((data) => data.tipeLink !== 'otomatis' || !!data.generateLink, {
    message: 'Tipe pembuatan link wajib dipilih',
    path: ['generateLink'],
  })

export type TambahKonferensiSesiFormSchema = {
  judul?: string
  catatan?: string
  tipeLink: string
  link?: string
  generateLink?: string
}

const initTipeLinkOptions: RadioGroupOptionType[] = [
  { label: 'Link Manual', value: 'manual' },
  { label: 'Generate Link', value: 'otomatis' },
]

const initGenerateLinkOptions: AdvancedRadioGroupOptionType[] = [
  {
    value: 'ZOOM',
    label: (
      <div className="flex items-center gap-2">
        <Image src={zoomIcon} alt="zoom" width={24} height={24} />
        <Text size="xs" weight="medium">
          Zoom
        </Text>
      </div>
    ),
  },
  {
    value: 'GOOGLE_MEET',
    label: (
      <div className="flex items-center gap-2">
        <Image src={googleMeetIcon} alt="google meet" width={24} height={24} />
        <Text size="xs" weight="medium">
          Google Meet
        </Text>
      </div>
    ),
  },
]

const initialValues: TambahKonferensiSesiFormSchema = {
  tipeLink: 'manual',
}

type TambahKonferensiSesiModalProps = {
  idSesi: string | undefined
  show?: boolean
  onHide: () => void
}

export default function TambahKonferensiSesiModal({
  idSesi,
  show = false,
  onHide,
}: TambahKonferensiSesiModalProps) {
  const { processApi, jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: generateLinkOptions } = useQuery<
    AdvancedRadioGroupOptionType[]
  >({
    queryKey: ['pengguna.koneksi-akun', show],
    queryFn: async () => {
      if (!show) return []

      const { data } = await dataKoneksiAkunApi(jwt)

      const options = []
      if (data?.zoom) options.push(initGenerateLinkOptions[0])
      if (data?.google_meet) options.push(initGenerateLinkOptions[1])

      return options
    },
  })

  const tipeLinkOptions = useMemo(
    () =>
      !!generateLinkOptions?.length
        ? initTipeLinkOptions
        : [initTipeLinkOptions[0]],
    [generateLinkOptions]
  )

  const onSubmit: SubmitHandler<TambahKonferensiSesiFormSchema> = async (
    data
  ) => {
    if (!idSesi) return

    await handleActionWithToast(
      processApi(tambahAktifitasKonferensiSesiApi, idKelas, idSesi, data),
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
      title="Bagikan Konferensi"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahKonferensiSesiFormSchema>
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
              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Konferensi"
                placeholder="Tulis judul konferensi di sini"
                required
              />

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait konferensi yang diberikan"
                toolbar="minimalist"
              />

              <ControlledRadioGroup
                name="tipeLink"
                control={control}
                options={tipeLinkOptions}
                errors={errors}
                className="mt-2 mb-1.5"
                groupClassName="gap-8"
              />

              {watch('tipeLink') === 'manual' ? (
                <ControlledInput
                  name="link"
                  control={control}
                  errors={errors}
                  label="Link Konferensi"
                  placeholder="Tulis link konferensi di sini"
                  required
                />
              ) : (
                <ControlledAdvancedRadioGroup
                  name="generateLink"
                  control={control}
                  options={generateLinkOptions}
                  errors={errors}
                  className="mb-1.5"
                  groupClassName="gap-4"
                  optionContentClassNames="px-6 py-3"
                  optionInputClassNames="[&:checked~span_.icon]:block"
                />
              )}

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
