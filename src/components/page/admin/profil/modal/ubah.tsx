import { dataProfileAction } from '@/actions/admin/profil/data'
import { ubahProfileAction } from '@/actions/admin/profil/ubah-data'
import {
  CardSeparator,
  ControlledInput,
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

type UbahProfileFormSchema = {
  nama?: string
  kontak?: string
  jenisKelamin?: string
}

const jenisKelaminOptions: RadioGroupOptionType[] = [
  radioGroupOption('Laki-laki'),
  radioGroupOption('Perempuan'),
]

type UbahModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
}

export default function UbahModal({ showModal, setShowModal }: UbahModalProps) {
  const [formError, setFormError] = useState<string>()
  const { update: updateSession } = useSession()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.profil'],
    queryFn: async () => {
      const { data } = await dataProfileAction()
      return data
    },
  })

  const onSubmit: SubmitHandler<UbahProfileFormSchema> = async (data) => {
    await handleActionWithToast(ubahProfileAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: async () => {
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: ['admin.profil'] })
        updateSession({ name: data.nama })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const initialValues: UbahProfileFormSchema = {
    nama: data?.nama,
    kontak: data?.hp,
    jenisKelamin: data?.jenis_kelamin,
  }

  return (
    <Modal
      title="Ubah Data Profil"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      {isLoading ? (
        <Loader height={336} />
      ) : (
        <Form<UbahProfileFormSchema>
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
