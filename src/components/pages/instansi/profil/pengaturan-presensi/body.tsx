'use client'

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
import { wait } from '@/utils/wait'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  absensiPengajar: z.array(z.string()),
  absensiPeserta: z.array(z.string()),
})

type PengaturanPresensiFormSchema = {
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
  { label: 'Presensi GPS dan Swafoto', value: 'GPS dan Swafoto' },
  { label: 'Presensi QR Code', value: 'QR Code' },
]

export default function PengaturanPresensiBody() {
  const onSubmit: SubmitHandler<PengaturanPresensiFormSchema> = async (
    data
  ) => {
    console.log(data)

    await wait(3000)

    // await handleActionWithToast(processApi(ubahProfilApi, data), {
    //   loading: 'Menyimpan...',
    //   onStart: () => setFormError(undefined),
    //   onSuccess: () => {
    //     setShow(false)
    //     queryClient.invalidateQueries({ queryKey: ['instansi.profil'] })
    //     updateSession({ name: data.nama })
    //   },
    //   onError: ({ message }) => setFormError(message),
    // })
  }

  const initialValues: PengaturanPresensiFormSchema = {
    absensiPengajar: [],
    absensiPeserta: [],
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
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex justify-between p-2">
                <Title as="h4" size="1.5xl" weight="semibold">
                  Pengaturan Presensi
                </Title>
                <ButtonSubmit
                  size="sm"
                  color="warning"
                  isSubmitting={isSubmitting}
                >
                  Simpan Perubahan
                </ButtonSubmit>
              </div>
              <CardSeparator />
              <table className="mx-2 my-4">
                <tbody className="[&_td]:align-top [&_td]:py-4">
                  <tr>
                    <td width={150}>
                      <TextLabel>
                        <Label label="Pengajar" />
                      </TextLabel>
                    </td>
                    <td width={500}>
                      <ControlledCheckboxGroup
                        name="absensiPengajar"
                        control={control}
                        options={AbsensiPengajarOptions}
                        errors={errors}
                        groupClassName="flex-wrap gap-x-6"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <TextLabel>
                        <Label label="Pengajar" />
                      </TextLabel>
                    </td>
                    <td>
                      <ControlledCheckboxGroup
                        name="absensiPeserta"
                        control={control}
                        options={AbsensiPesertaOptions}
                        errors={errors}
                        groupClassName="flex-wrap gap-x-6"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </Form>
      </Card>
    </>
  )
}
