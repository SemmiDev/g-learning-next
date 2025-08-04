import {
  ButtonSubmit,
  Card,
  CardSeparator,
  ControlledInputNumber,
  Form,
  TextLabel,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataPengaturanPoinApi } from '@/services/api/instansi/pengaturan/poin'
import { ubahPengaturanPoinApi } from '@/services/api/instansi/pengaturan/ubah-poin'
import { handleActionWithToast } from '@/utils/action'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  uts: z.number().min(0),
  uas: z.number().min(0),
  uploadBahanAjar: z.number().min(0),
  linkKonferensi: z.number().min(0),
  informasi: z.number().min(0),
  presensi: z.number().min(0),
})

export type PengaturanPoinTabFormSchema = {
  uts: number
  uas: number
  uploadBahanAjar: number
  linkKonferensi: number
  informasi: number
  presensi: number
}

const queryKey = ['instansi.pengaturan.poin']

export default function PengaturanPoinTab() {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const { data: initialValues, isLoading } =
    useQuery<PengaturanPoinTabFormSchema>({
      queryKey,
      queryFn: async () => {
        const { data } = await processApi(dataPengaturanPoinApi)

        return {
          uts: data?.poin_uts,
          uas: data?.poin_uas,
          uploadBahanAjar: data?.poin_upload_bahan_ajar,
          linkKonferensi: data?.poin_link_konferensi,
          informasi: data?.poin_informasi,
          presensi: data?.poin_absensi,
        } as PengaturanPoinTabFormSchema
      },
    })

  const onSubmit: SubmitHandler<PengaturanPoinTabFormSchema> = async (data) => {
    await handleActionWithToast(processApi(ubahPengaturanPoinApi, data), {
      loading: 'Menyimpan...',
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  return (
    <Card className="flex flex-col p-0">
      <Form<PengaturanPoinTabFormSchema>
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
            <div className="flex justify-between flex-wrap gap-1 p-2">
              <Title as="h4" size="1.5xl" weight="semibold">
                Pengaturan Poin
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
            <div className="flex flex-col max-w-72 overflow-x-auto px-2 py-2">
              <table className="[&_td]:py-2.5 [&_td:first-child]:pe-2">
                <tbody>
                  <tr>
                    <td className="min-w-[8.5rem]">
                      <TextLabel>UTS</TextLabel>
                    </td>
                    <td className="w-24">
                      <ControlledInputNumber
                        control={control}
                        name="uts"
                        errors={errors}
                        placeholder="Poin"
                        disabled={isLoading}
                        min={0}
                        stepper
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <TextLabel>UAS</TextLabel>
                    </td>
                    <td>
                      <ControlledInputNumber
                        control={control}
                        name="uas"
                        errors={errors}
                        placeholder="Poin"
                        disabled={isLoading}
                        min={0}
                        stepper
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <TextLabel>Upload Bahan Ajar</TextLabel>
                    </td>
                    <td>
                      <ControlledInputNumber
                        control={control}
                        name="uploadBahanAjar"
                        errors={errors}
                        placeholder="Poin"
                        disabled={isLoading}
                        min={0}
                        stepper
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <TextLabel>Link Konferensi</TextLabel>
                    </td>
                    <td>
                      <ControlledInputNumber
                        control={control}
                        name="linkKonferensi"
                        errors={errors}
                        placeholder="Poin"
                        disabled={isLoading}
                        min={0}
                        stepper
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <TextLabel>Informasi</TextLabel>
                    </td>
                    <td>
                      <ControlledInputNumber
                        control={control}
                        name="informasi"
                        errors={errors}
                        placeholder="Poin"
                        disabled={isLoading}
                        min={0}
                        stepper
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <TextLabel>Presensi</TextLabel>
                    </td>
                    <td>
                      <ControlledInputNumber
                        control={control}
                        name="presensi"
                        errors={errors}
                        placeholder="Poin"
                        disabled={isLoading}
                        min={0}
                        stepper
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </Form>
    </Card>
  )
}
