import {
  CardSeparator,
  ControlledUploadFile,
  Form,
  Modal,
  ModalFooterButtons,
  Text,
  UploadFileType,
} from '@/components/ui'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { BsExclamationCircle } from 'react-icons/bs'

const formSchema = z.object({
  berkas: z.any().superRefine(objectRequired),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  berkas?: UploadFileType
}

const initialValues: FormSchema = {}

export default function ImportSoalModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
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
                      href="http://www.google.com"
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
