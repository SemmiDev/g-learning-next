import {
  ControlledInput,
  ControlledQuillEditor,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/instansi/profil/detail/data'
import { ubahProfilApi } from '@/services/api/instansi/profil/detail/ubah-data'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryData } from '@/utils/query-data'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  pimpinan: z.string().pipe(required),
  kontakPimpinan: z.string().optional(),
  alamat: z.string().optional(),
  kontak: z.string().optional(),
  bio: z.string().optional(),
})

export type UbahProfilFormSchema = {
  nama?: string
  pimpinan?: string
  kontakPimpinan?: string
  alamat?: string
  kontak?: string
  bio?: string
}

type UbahModalProps = {
  show: boolean
  setShow(show: boolean): void
}

export default function UbahModal({ show, setShow }: UbahModalProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()
  const { update: updateSession } = useSession()

  const [formError, setFormError] = useState<string>()

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['instansi.profil'],
    queryFn: makeSimpleQueryData(dataProfilApi, jwt),
  })

  const initialValues: UbahProfilFormSchema = {
    nama: data?.instansi.nama,
    pimpinan: data?.instansi.nama_pimpinan,
    kontakPimpinan: data?.instansi.telepon_pimpinan,
    alamat: data?.instansi.alamat,
    kontak: data?.instansi.telepon_instansi,
    bio: data?.instansi.bio,
  }

  const onSubmit: SubmitHandler<UbahProfilFormSchema> = async (data) => {
    await handleActionWithToast(ubahProfilApi(jwt, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({ queryKey: ['instansi.profil'] })
        updateSession({ name: data.nama })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  useEffect(() => {
    if (show) refetch()
  }, [show, refetch])

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Data Instansi"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={547} />
      ) : (
        <Form<UbahProfilFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
          flexing
        >
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="nama"
                  control={control}
                  errors={errors}
                  label="Nama Instansi"
                  placeholder="Nama Instansi"
                />

                <ControlledInput
                  name="pimpinan"
                  control={control}
                  errors={errors}
                  label="Nama Pimpinan"
                  placeholder="Nama Pimpinan"
                />

                <ControlledInput
                  name="kontakPimpinan"
                  control={control}
                  errors={errors}
                  type="number"
                  label="Nomor Kontak Pimpinan"
                  placeholder="08xxxxxxx"
                  phoneNumber
                />

                <ControlledInput
                  name="alamat"
                  control={control}
                  errors={errors}
                  label="Alamat Instansi"
                  placeholder="Alamat Lengkap Instansi"
                />

                <ControlledInput
                  name="kontak"
                  control={control}
                  errors={errors}
                  type="number"
                  label="Nomor Kontak Admin/Instansi"
                  placeholder="08xxxxxxx"
                  phoneNumber
                />

                <ControlledQuillEditor
                  name="bio"
                  control={control}
                  errors={errors}
                  label="Bio"
                  placeholder="Biodata Instansi"
                  toolbar="minimalist"
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
