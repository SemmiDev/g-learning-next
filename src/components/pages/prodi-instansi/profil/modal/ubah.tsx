import {
  ContentLoader,
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/prodi-instansi/profil/data'
import { ubahProfilApi } from '@/services/api/prodi-instansi/profil/ubah-data'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

type UbahProfilFormSchema = {
  nama?: string
}

type UbahModalProps = {
  show: boolean
  setShow(show: boolean): void
}

export default function UbahModal({ show, setShow }: UbahModalProps) {
  const { makeSimpleApiQueryData, processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const { update: updateSession } = useSession()

  const [formError, setFormError] = useState<string>()

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['prodi-instansi.profil'],
    queryFn: makeSimpleApiQueryData(dataProfilApi),
  })

  const initialValues: UbahProfilFormSchema = {
    nama: data?.nama,
  }

  const onSubmit: SubmitHandler<UbahProfilFormSchema> = async (data) => {
    await handleActionWithToast(processApi(ubahProfilApi, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: async () => {
        setShow(false)
        queryClient.invalidateQueries({ queryKey: ['prodi-instansi.profil'] })
        updateSession({ name: data.nama })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  useEffect(() => {
    if (show) refetch()
  }, [show])

  return (
    <Modal
      title="Ubah Data Profil"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <ContentLoader height={300} />
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
