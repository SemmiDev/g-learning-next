import { dataProfilAction } from '@/actions/instansi/profil/data'
import { ubahProfilAction } from '@/actions/instansi/profil/ubah-data'
import {
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryData } from '@/utils/query-data'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
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
  showModal: boolean
  setShowModal(show: boolean): void
}

export default function UbahModal({ showModal, setShowModal }: UbahModalProps) {
  const [formError, setFormError] = useState<string>()
  const { update: updateSession } = useSession()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['instansi.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  const onSubmit: SubmitHandler<UbahProfilFormSchema> = async (data) => {
    await handleActionWithToast(ubahProfilAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: ['instansi.profil'] })
        updateSession({ name: data.nama })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const initialValues: UbahProfilFormSchema = {
    nama: data?.instansi.nama,
    pimpinan: data?.instansi.nama_pimpinan,
    kontakPimpinan: data?.instansi.telepon_pimpinan,
    alamat: data?.instansi.alamat,
    kontak: data?.instansi.telepon_instansi,
    bio: data?.instansi.bio,
  }

  return (
    <Modal
      title="Ubah Data Instansi"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      {isLoading || !showModal ? (
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
      )}
    </Modal>
  )
}
