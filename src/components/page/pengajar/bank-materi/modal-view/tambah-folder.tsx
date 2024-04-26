import { Button, CardSeparator, Modal } from '@/components/ui'
import { Form } from '@/components/ui/form'
import { SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { required } from '@/utils/validations/pipe'
import ControlledInput from '@/components/ui/controlled/input'
import ModalHeader from '@/components/ui/modal/header'
import { ModalViewProps } from '@/app/shared/modal-views/use-modal'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
}

const initialValues: FormSchema = {}

export default function TambahFolderModalView({ closeModal }: ModalViewProps) {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <>
      <ModalHeader
        title="Tambah Folder Baru"
        desc="Buat folder baru untuk menyimpan materi Kamu"
        onClose={closeModal}
      />
      <Form<FormSchema>
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
                label="Nama Folder"
                placeholder="Tulis nama folder di sini"
                name="nama"
                control={control}
                errors={errors}
              />
            </div>
            <CardSeparator />

            <div className="flex gap-2 p-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                Buat Folder Baru
              </Button>
              <Button variant="outline" className="flex-1" onClick={closeModal}>
                Batal
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
