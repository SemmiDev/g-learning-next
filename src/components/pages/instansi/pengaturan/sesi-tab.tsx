import {
  ButtonSubmit,
  Card,
  CardSeparator,
  Form,
  Label,
  TextLabel,
  Title,
} from '@/components/ui'
import ControlledCheckboxGroup, {
  CheckboxGroupOptionType,
} from '@/components/ui/controlled/checkbox-group'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  aksesSesiPengajar: z
    .array(z.string())
    .min(1, 'Presensi pengajar wajib dipilih'),
})

export type PengaturanSesiFormSchema = {
  aksesSesiPengajar: string[]
}

const AksesOptions: CheckboxGroupOptionType[] = [
  { label: 'Tambah Sesi', value: 'Tambah' },
  { label: 'Ubah Sesi', value: 'Ubah' },
  { label: 'Hapus Sesi', value: 'Hapus' },
]

const queryKey = ['instansi.pengaturan.sesi']

export default function PengaturanSesiTab() {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const initialValues = {
    aksesSesiPengajar: [],
  }

  // const { data: initialValues, isLoading } =
  //   useQuery<PengaturanSesiFormSchema>({
  //     queryKey,
  //     queryFn: async () => {
  //       const {data} = dataPengaturanSesiApi(jwt)

  //       return {
  //         aksesSesiPengajar: (data?.absensi_dosen ?? [])
  //           .filter((item) => item.aktif)
  //           .map((item) => item.tipe),
  //       }
  //     },
  //   })

  const onSubmit: SubmitHandler<PengaturanSesiFormSchema> = async (data) => {
    console.log(data)

    // await handleActionWithToast(processApi(ubahPengaturanSesiApi, data), {
    //   loading: 'Menyimpan...',
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey })
    //   },
    // })
  }

  const isLoading = false

  return (
    <>
      <Card className="flex flex-col p-0">
        <Form<PengaturanSesiFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({ control, formState: { errors, isSubmitting, isDirty } }) => (
            <>
              <div className="flex justify-between flex-wrap gap-1 px-2.5 py-2">
                <Title as="h4" size="1.5xl" weight="semibold">
                  Pengaturan Sesi Pembelajaran
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
              <div className="flex flex-col gap-6 px-2.5 py-4">
                <div className="flex flex-col gap-2">
                  <TextLabel>
                    <Label label="Akses Kontrol Pengajar pada Sesi Pembelajaran" />
                  </TextLabel>
                  <ControlledCheckboxGroup
                    name="aksesSesiPengajar"
                    control={control}
                    options={AksesOptions}
                    errors={errors}
                    groupClassName="flex-wrap gap-x-6"
                    disabled={isLoading}
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
