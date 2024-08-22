import { DataType } from '@/actions/pengguna/profil/data'
import { ubahProfileAction } from '@/actions/pengguna/profil/ubah-data'
import {
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Form,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Alert } from 'rizzui'

const formSchema = z.object({
  nama: z.string().pipe(required),
  nik: z.string().pipe(required),
  kontak: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  jenisKelamin: z.string().pipe(required),
  bio: z.string().optional(),
})

// type FormSchema = z.infer<typeof formSchema>
export type UbahProfileFormSchema = {
  nama?: string
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

type UbahModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
  data: DataType | undefined
}

export default function UbahModal({
  showModal,
  setShowModal,
  data,
}: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<UbahProfileFormSchema> = async (data) => {
    await handleActionWithToast(ubahProfileAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: ['pengguna.profil'] })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ubah Data Profil"
      color="warning"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<UbahProfileFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: {
            nama: data?.nama,
            nik: data?.nik,
            jenisKelamin: data?.jenis_kelamin,
            kontak: data?.hp,
            website: data?.situs_web,
            bio: data?.bio,
          },
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Lengkap"
                placeholder="Nama Lengkap"
                required
              />

              <ControlledInput
                name="nik"
                control={control}
                errors={errors}
                label="NIK"
                placeholder="Nomor Induk Kependudukan"
                required
              />

              <ControlledInput
                name="kontak"
                control={control}
                errors={errors}
                type="number"
                label="Nomor Kontak"
                placeholder="08xxxxxxx"
                phoneNumber
              />

              <ControlledInput
                name="website"
                control={control}
                errors={errors}
                type="url"
                label="Website"
                placeholder="Website"
              />

              <ControlledRadioGroup
                name="jenisKelamin"
                control={control}
                options={jenisKelaminOptions}
                label="Jenis Kelamin"
                errors={errors}
              />

              <ControlledQuillEditor
                name="bio"
                control={control}
                toolbar="minimalist"
                label="Bio"
                placeholder="Biodata Diri"
                errors={errors}
              />

              {formError && (
                <Alert size="sm" variant="flat" color="danger">
                  <Text size="sm" weight="medium">
                    {formError}
                  </Text>
                </Alert>
              )}
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              submitColor="warning"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
