'use client'

import { simpanDataProfilAction } from '@/services/api/pengguna/lengkapi-profil/simpan'
import {
  ButtonSubmit,
  Card,
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Form,
  Label,
  RadioGroupOptionType,
  TextBordered,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useRouter } from '@bprogress/next/app'
import { ReactNode } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nik: z
    .string()
    .pipe(
      required.min(16, 'NIK harus 16 karakter').max(16, 'NIK harus 16 karakter')
    ),
  kontak: z.string().optional(),
  website: z.string().optional(),
  jenisKelamin: z.string().optional(),
  bio: z.string().optional(),
})

export type LengkapiProfilFormSchema = {
  nik?: string
  kontak?: string
  website?: string
  jenisKelamin?: string
  bio?: string
}

const jenisKelaminOptions: RadioGroupOptionType[] = [
  radioGroupOption('Laki-laki'),
  radioGroupOption('Perempuan'),
]

const initialValues: LengkapiProfilFormSchema = {}

export default function LengkapiProfilBody() {
  const router = useRouter()

  const onSubmit: SubmitHandler<LengkapiProfilFormSchema> = async (data) => {
    handleActionWithToast(simpanDataProfilAction(data), {
      loading: 'Menyimpan...',
      success: 'Data profil berhasil disimpan',
      onSuccess: () => {
        router.replace(routes.dashboard)
        router.refresh()
      },
    })
  }

  return (
    <Card className="flex flex-col p-0">
      <div className="flex justify-between p-2">
        <Title as="h4" size="1.5xl" weight="semibold">
          Profil Saya
        </Title>
      </div>
      <CardSeparator />
      <Form<LengkapiProfilFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        className="p-2"
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <table className="w-full text-sm text-gray-dark">
              <tbody>
                <DataRow label="NIK" required>
                  <ControlledInput
                    name="nik"
                    control={control}
                    errors={errors}
                    placeholder="Nomor Induk Kependudukan"
                  />
                </DataRow>
                <DataRow label="Nomor Kontak">
                  <ControlledInput
                    name="kontak"
                    control={control}
                    errors={errors}
                    type="number"
                    placeholder="08xxxxxxx"
                    phoneNumber
                  />
                </DataRow>
                <DataRow label="Website">
                  <ControlledInput
                    name="website"
                    control={control}
                    errors={errors}
                    type="url"
                    placeholder="Website"
                  />
                </DataRow>
                <DataRow label="Jenis Kelamin">
                  <ControlledRadioGroup
                    name="jenisKelamin"
                    control={control}
                    options={jenisKelaminOptions}
                    errors={errors}
                  />
                </DataRow>
                <DataRow label="Bio">
                  <ControlledQuillEditor
                    name="bio"
                    control={control}
                    toolbar="minimalist"
                    placeholder="Biodata Diri"
                    errors={errors}
                  />
                </DataRow>
                <DataRow>
                  <ButtonSubmit isSubmitting={isSubmitting}>
                    Simpan Data Profil
                  </ButtonSubmit>
                </DataRow>
              </tbody>
            </table>
          </>
        )}
      </Form>
    </Card>
  )
}

function DataRow({
  label,
  required,
  children,
  outline,
}: {
  label?: string
  required?: boolean
  children?: ReactNode
  outline?: boolean
}) {
  return (
    <tr className="[&>td]:py-2">
      <td className="w-36 font-semibold align-baseline">
        <Label label={label} required={required} />
      </td>
      <td className="">
        {outline ? <TextBordered>{children}</TextBordered> : children}
      </td>
    </tr>
  )
}
