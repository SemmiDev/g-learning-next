import { dataProfilAction } from '@/actions/pengguna/profil/data'
import { ubahProfilAction } from '@/actions/pengguna/profil/ubah-data'
import {
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption } from '@/utils/object'
import { makeSimpleQueryData } from '@/utils/query-data'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  nik: z.string().pipe(required),
  kontak: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  jenisKelamin: z.string().pipe(required),
  bio: z.string().optional(),
})

export type UbahProfilFormSchema = {
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
  show: boolean
  setShow(show: boolean): void
}

export default function UbahModal({ show, setShow }: UbahModalProps) {
  const [formError, setFormError] = useState<string>()
  const { update: updateSession } = useSession()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pengguna.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  const initialValues: UbahProfilFormSchema = {
    nama: data?.nama,
    nik: data?.nik,
    jenisKelamin: data?.jenis_kelamin,
    kontak: data?.hp,
    website: data?.situs_web,
    bio: data?.bio,
  }

  const onSubmit: SubmitHandler<UbahProfilFormSchema> = async (data) => {
    await handleActionWithToast(ubahProfilAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({ queryKey: ['pengguna.profil'] })
        updateSession({ name: data.nama })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Data Profil"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading || !show ? (
        <Loader height={512} />
      ) : (
        <Form<UbahProfilFormSchema>
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
