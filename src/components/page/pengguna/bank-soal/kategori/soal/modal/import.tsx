import { importSoalAction } from '@/actions/pengguna/bank-soal/soal/import'
import {
  CardSeparator,
  ControlledUploadFile,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { API_URL } from '@/config/const'
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

// type FormSchema = z.infer<typeof formSchema>
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
  const [formError, setFormError] = useState<string>()
  const queryClient = useQueryClient()

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

  return (
    <Modal
      title="Import Soal"
      size="xl"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex flex-col border border-dashed border-primary bg-[#EAF4FD] rounded-md p-4">
                <div className="flex items-center">
                  <BsExclamationCircle size={32} className="mr-4" />
                  <Text weight="bold" variant="dark" className="text-[2rem]">
                    Ketentuan sebelum melakukan Import soal
                  </Text>
                </div>
                <ol className="list-decimal text-sm font-semibold text-gray-dark pl-16 mt-4">
                  <li>
                    Download dan gunakan template yang sudah disediakan{' '}
                    <a
                      href={`${API_URL}/templates/soal`}
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
              />

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Upload"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
