import { tambahFolderAction } from '@/services/api/shared/pustaka-media/tambah-folder'
import {
  CardSeparator,
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  deskripsi: z.string().optional(),
})

export type TambahFolderFormSchema = {
  nama?: string
  deskripsi?: string
}

const initialValues: TambahFolderFormSchema = {}

type TambahModalProps = {
  show: boolean
  setShow(show: boolean): void
  refetchKey: QueryKey
  googleDrive?: boolean
  idInstansi: string | undefined
  idFolder: string | undefined
}

export default function TambahFolderModal({
  show = false,
  setShow,
  refetchKey,
  googleDrive,
  idInstansi,
  idFolder,
}: TambahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahFolderFormSchema> = async (data) => {
    await handleActionWithToast(
      tambahFolderAction(data, googleDrive, idInstansi, idFolder),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          setShow(false)
          queryClient.invalidateQueries({ queryKey: refetchKey })
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  return (
    <Modal title="Tambah Folder" isOpen={show} onClose={() => setShow(false)}>
      <Form<TambahFolderFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Folder"
                placeholder="Nama Folder"
                required
              />

              <ControlledInput
                name="deskripsi"
                control={control}
                errors={errors}
                label="Tulis deskripsi folder jika ada"
                placeholder="Deskripsi"
              />

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              onCancel={() => setShow(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
