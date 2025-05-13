import {
  ControlledInput,
  ControlledRadioGroup,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/admin/profil/data'
import { ubahProfilApi } from '@/services/api/admin/profil/ubah-data'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption } from '@/utils/object'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  kontak: z.string().optional(),
  jenisKelamin: z.string().optional(),
})

type UbahProfilFormSchema = {
  nama?: string
  kontak?: string
  jenisKelamin?: string
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
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()
  const { update: updateSession } = useSession()

  const [formError, setFormError] = useState<string>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.profil'],
    queryFn: makeSimpleQueryDataWithParams(dataProfilApi, jwt),
  })

  const initialValues: UbahProfilFormSchema = {
    nama: data?.nama,
    kontak: data?.hp,
    jenisKelamin: data?.jenis_kelamin,
  }

  const onSubmit: SubmitHandler<UbahProfilFormSchema> = async (data) => {
    await handleActionWithToast(ubahProfilApi(jwt, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: async () => {
        setShow(false)
        queryClient.invalidateQueries({ queryKey: ['admin.profil'] })
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
        <Loader height={300} />
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

                <ControlledRadioGroup
                  name="jenisKelamin"
                  control={control}
                  options={jenisKelaminOptions}
                  label="Jenis Kelamin"
                  errors={errors}
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
