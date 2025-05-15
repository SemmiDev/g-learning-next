import {
  ControlledRadioGroup,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { ubahJenisAbsenSesiApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/ubah-jenis-absen'
import { handleActionWithToast } from '@/utils/action'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'

const formSchema = z.object({
  jenis: z.string(),
})

export type UbahJenisAbsenSesiFormSchema = {
  jenis?: string
}

const jenisAbsenOptions: RadioGroupOptionType[] = [
  { label: 'Presensi Manual', value: 'Manual' },
  { label: 'Presensi Otomatis', value: 'Otomatis' },
  { label: 'Presensi GPS', value: 'GPS' },
  { label: 'Presensi Swafoto', value: 'Swafoto' },
  { label: 'Presensi GPS dan Swafoto', value: 'GPS dan Swafoto' },
  { label: 'Presensi QR Code', value: 'QR Code' },
]

type UbahMateriModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahJenisAbsenSesiModal({
  id,
  show,
  onHide,
}: UbahMateriModalProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.ubah-jenis-absen',
    'pengajar',
    idKelas,
    id,
  ]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahJenisAbsenSesiFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatSesiPembelajaranApi(jwt, idKelas, id)

      return {
        jenis: data?.jenis_absensi_peserta,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahJenisAbsenSesiFormSchema> = async (
    data
  ) => {
    if (!id) return

    await handleActionWithToast(ubahJenisAbsenSesiApi(jwt, idKelas, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'pengguna.ruang-kelas.sesi-pembelajaran.list',
            'pengajar',
            idKelas,
          ],
        })
        queryClient.invalidateQueries({
          queryKey: [
            'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
            'pengajar',
            idKelas,
            id,
          ],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahJenisAbsenSesiFormSchema) => ({
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
      title="Ubah Jenis Presensi Peserta"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={168} />
      ) : (
        <Form<UbahJenisAbsenSesiFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledRadioGroup
                  name="jenis"
                  control={control}
                  errors={errors}
                  label={
                    <div className="flex items-center text-nowrap">
                      Jenis Presensi
                      <BsInfoCircle size={12} className="ml-1" />
                    </div>
                  }
                  className="flex flex-col gap-x-8 gap-y-4 my-2 xs:flex-row"
                  groupClassName="flex-wrap gap-x-8 gap-y-4"
                  optionClassNames="w-full xs:w-auto"
                  labelClassName="mb-0"
                  options={jenisAbsenOptions}
                />

                <FormError error={formError} />
              </div>

              <ModalFooterButtons
                submit="Simpan"
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
                borderTop
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
