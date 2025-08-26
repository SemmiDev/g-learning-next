import {
  ButtonSubmit,
  Card,
  CardSeparator,
  ControlledCheckbox,
  Form,
  Label,
  TextLabel,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataPengaturanApi } from '@/services/api/instansi/pengaturan/data'
import { ubahPengaturanSesiApi } from '@/services/api/instansi/pengaturan/sesi/ubah'
import { handleActionWithToast } from '@/utils/action'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  aksesTambah: z.boolean(),
  aksesUbah: z.boolean(),
  aksesHapus: z.boolean(),
})

export type PengaturanSesiFormSchema = {
  aksesTambah: boolean
  aksesUbah: boolean
  aksesHapus: boolean
}

const queryKey = ['instansi.pengaturan.sesi']

export default function PengaturanSesiTab() {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const { data: initialValues, isLoading } = useQuery<PengaturanSesiFormSchema>(
    {
      queryKey,
      queryFn: async () => {
        const { data } = await dataPengaturanApi(jwt)

        return {
          aksesTambah: data?.pengaturan_tambah_pertemuan ?? false,
          aksesUbah: data?.pengaturan_edit_pertemuan ?? false,
          aksesHapus: data?.pengaturan_hapus_pertemuan ?? false,
        }
      },
    }
  )

  const onSubmit: SubmitHandler<PengaturanSesiFormSchema> = async (data) => {
    console.log(data)

    await handleActionWithToast(processApi(ubahPengaturanSesiApi, data), {
      loading: 'Menyimpan...',
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

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
                  <div className="flex gap-4">
                    <ControlledCheckbox
                      name="aksesTambah"
                      label="Tambah Sesi"
                      control={control}
                      errors={errors}
                      disabled={isLoading}
                    />
                    <ControlledCheckbox
                      name="aksesUbah"
                      label="Ubah Sesi"
                      control={control}
                      errors={errors}
                      disabled={isLoading}
                    />
                    <ControlledCheckbox
                      name="aksesHapus"
                      label="Hapus Sesi"
                      control={control}
                      errors={errors}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </Form>
      </Card>
    </>
  )
}
