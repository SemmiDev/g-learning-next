'use client'

import {
  ButtonSubmit,
  Card,
  CardSeparator,
  Form,
  Label,
  Switch,
  TextLabel,
  Title,
} from '@/components/ui'
import ControlledCheckboxGroup, {
  CheckboxGroupOptionType,
} from '@/components/ui/controlled/checkbox-group'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataPengaturanPresensiApi } from '@/services/api/instansi/profil/pengaturan-presensi/data'
import { dataPengaturanApi } from '@/services/api/instansi/profil/pengaturan-presensi/data-pengaturan'
import { ubahPengaturanPresensiApi } from '@/services/api/instansi/profil/pengaturan-presensi/ubah'
import { handleActionWithToast } from '@/utils/action'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  aktif: z.boolean(),
  absensiPengajar: z
    .array(z.string())
    .min(1, 'Presensi pengajar wajib dipilih'),
  absensiPeserta: z.array(z.string()).min(1, 'Presensi peserta wajib dipilih'),
})

export type PengaturanPresensiFormSchema = {
  aktif: boolean
  absensiPengajar: string[]
  absensiPeserta: string[]
}

const AbsensiPengajarOptions: CheckboxGroupOptionType[] = [
  { label: 'Presensi GPS', value: 'GPS' },
  { label: 'Presensi Swafoto', value: 'Swafoto' },
]

const AbsensiPesertaOptions: CheckboxGroupOptionType[] = [
  { label: 'Presensi Manual', value: 'Manual' },
  { label: 'Presensi Otomatis', value: 'Otomatis' },
  { label: 'Presensi GPS', value: 'GPS' },
  { label: 'Presensi Swafoto', value: 'Swafoto' },
  { label: 'Presensi QR Code', value: 'QR Code' },
]

const queryKey = ['instansi.profil.pengaturan-presensi']

export default function PengaturanPresensiBody() {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const { data: initialValues, isLoading } =
    useQuery<PengaturanPresensiFormSchema>({
      queryKey,
      queryFn: async () => {
        const [{ data }, { data: dataPengaturan }] = await Promise.all([
          dataPengaturanPresensiApi(jwt),
          dataPengaturanApi(jwt),
        ])

        return {
          aktif: !(dataPengaturan?.pengaturan_absensi_dosen_simpeg ?? false),
          absensiPengajar: (data?.absensi_dosen ?? [])
            .filter((item) => item.aktif)
            .map((item) => item.tipe),
          absensiPeserta: (data?.absensi_mahasiswa ?? [])
            .filter((item) => item.aktif)
            .map((item) => item.tipe),
        }
      },
    })

  const onSubmit: SubmitHandler<PengaturanPresensiFormSchema> = async (
    data
  ) => {
    await handleActionWithToast(processApi(ubahPengaturanPresensiApi, data), {
      loading: 'Menyimpan...',
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  return (
    <>
      <Card className="flex flex-col p-0">
        <Form<PengaturanPresensiFormSchema>
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
            register,
            watch,
            formState: { errors, isSubmitting, isDirty },
          }) => (
            <>
              <div className="flex justify-between flex-wrap gap-1 p-2">
                <Title as="h4" size="1.5xl" weight="semibold">
                  Pengaturan Presensi
                </Title>
                <ButtonSubmit
                  size="sm"
                  color="warning"
                  isSubmitting={isSubmitting}
                  disabled={isLoading || !isDirty}
                  showLoader={false}
                >
                  Simpan Perubahan
                </ButtonSubmit>
              </div>
              <CardSeparator />
              <div className="flex flex-col gap-6 px-2 py-4">
                <Switch
                  label="Aktifkan Fitur Presensi"
                  labelClassName="text-gray-dark font-semibold"
                  {...register('aktif')}
                />
                <div className="flex flex-col gap-2">
                  <TextLabel>
                    <Label label="Pengajar" />
                  </TextLabel>
                  <ControlledCheckboxGroup
                    name="absensiPengajar"
                    control={control}
                    options={AbsensiPengajarOptions}
                    errors={errors}
                    groupClassName="flex-wrap gap-x-6"
                    disabled={isLoading || !watch('aktif')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <TextLabel>
                    <Label label="Peserta" />
                  </TextLabel>
                  <ControlledCheckboxGroup
                    name="absensiPeserta"
                    control={control}
                    options={AbsensiPesertaOptions}
                    errors={errors}
                    groupClassName="flex-wrap gap-x-6"
                    disabled={isLoading || !watch('aktif')}
                  />
                </div>
              </div>
            </>
          )}
        </Form>
      </Card>
    </>
  )
}
