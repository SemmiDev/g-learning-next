import { lihatSesiPembelajaranAction } from '@/services/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { ubahJudulSesiAction } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/ubah-judul'
import {
  ControlledInput,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
})

export type UbahJudulSesiFormSchema = {
  judul?: string
}

type UbahMateriModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahJudulSesiModal({
  id,
  show,
  onHide,
}: UbahMateriModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.ubah-judul',
    'pengajar',
    idKelas,
    id,
  ]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahJudulSesiFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatSesiPembelajaranAction(idKelas, id)

      return {
        judul: data?.judul,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahJudulSesiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahJudulSesiAction(idKelas, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'pengguna.ruang-kelas.sesi-pembelajaran.list',
            'pengajar',
            idKelas,
          ],
        })
        queryClient.invalidateQueries({
          queryKey: [
            'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
            'pengajar',
            idKelas,
            id,
          ],
        })
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahJudulSesiFormSchema) => ({
            ...oldData,
            ...data,
          })
        )
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Judul Sesi Pembelajaran"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={154} />
      ) : (
        <Form<UbahJudulSesiFormSchema>
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
                  name="judul"
                  control={control}
                  errors={errors}
                  label="Judul Materi"
                  placeholder="Tulis judul materi di sini"
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
