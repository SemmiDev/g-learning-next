import { importSoalAction } from '@/actions/pengguna/bank-soal/soal/import'
import {
  ControlledUploadFile,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { useAutoSizeExtraLargeModal } from '@/hooks/auto-size-modal/use-extra-large-modal'
import { handleActionWithToast } from '@/utils/action'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsExclamationCircle } from 'react-icons/bs'

const formSchema = z.object({
  berkas: z.any().superRefine(objectRequired),
})

type FormSchema = {
  berkas?: any
}

const initialValues: FormSchema = {}

type ImportSoalModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
  refetchKey: QueryKey
}

export default function ImportSoalModal({
  showModal = false,
  setShowModal,
  refetchKey,
}: ImportSoalModalProps) {
  const queryClient = useQueryClient()
  const size = useAutoSizeExtraLargeModal()
  const [formError, setFormError] = useState<string>()

  const { soal: idBankSoal }: { soal: string } = useParams()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const form = new FormData()
    form.append('file', data.berkas)

    await handleActionWithToast(importSoalAction(idBankSoal, form), {
      loading: 'Mengunggah...',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: refetchKey })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShowModal(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Import Soal"
      size={size}
      isOpen={showModal}
      onClose={handleClose}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex flex-col border border-dashed border-primary bg-[#EAF4FD] rounded-md p-2 md:p-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <BsExclamationCircle className="size-6 md:size-8" />
                  <Text
                    weight="bold"
                    variant="dark"
                    className="text-xl md:text-3xl"
                  >
                    Ketentuan sebelum melakukan Import soal
                  </Text>
                </div>
                <ol className="list-decimal text-sm font-semibold text-gray-dark pl-12 mt-2 md:pl-16">
                  <li>
                    Download dan gunakan template yang sudah disediakan{' '}
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}/templates/soal`}
                      target="_blank"
                      className="text-primary hover:text-primary-dark"
                    >
                      (download templatenya di sini)
                    </a>
                  </li>
                  <li>
                    Isi dan lengkapi pertanyaan serta jawaban di kolom yang
                    tersedia pada template
                  </li>
                  <li>
                    Pastikan jenis file yang diuplado berupa .xlx atau .slsx
                  </li>
                  <li>
                    Pastikan semua kolom pada template terisi untuk menghindari
                    gagal saat import
                  </li>
                </ol>
              </div>

              <ControlledUploadFile
                name="berkas"
                control={control}
                errors={errors}
                desc="(Tipe file yang bisa diupload adalah: xls, xlsx dengan ukuran maksimal 100 MB untuk setiap file yang dipilih)"
                accept={{ 'application/vnd.ms-excel': ['.xls', '.xlsx'] }}
                required
              />

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Upload"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
