import { Button, CardSeparator, Modal, Text, TextLabel } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { required } from '@/utils/validations/pipe'
import {
  fileRequired,
  imageFileOnly,
  maxFileSize,
} from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { Controller, SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'
import { FileInput, Input, Radio } from 'rizzui'

const formSchema = z.object({
  title: z.string().pipe(required),
  subtitle: z.string(),
  jenis: z.string().pipe(required),
  catatan: z.string(),
  cover: z
    .any()
    .superRefine(maxFileSize({ max: 5, metric: 'MB', desc: 'gambar' }))
    .superRefine(imageFileOnly),
})

type FormSchema = z.infer<typeof formSchema>

const initialValues: FormSchema = {
  title: '',
  subtitle: '',
  jenis: 'Public',
  catatan: '',
}

export default function BuatKelasModal({
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
      title="Buat Kelas Baru"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({
          register,
          control,
          watch,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <Input
                label="Nama Program"
                placeholder="Tulis nama program di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('title')}
                error={errors.title?.message as string}
              />

              <Input
                label="Nama Kelas"
                placeholder="Tulis nama kelas di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('subtitle')}
                error={errors.subtitle?.message as string}
              />

              <div>
                <div className="flex items-center space-x-0.5 mb-2">
                  <TextLabel>Jenis Kelas</TextLabel>
                  <BsInfoCircle size={12} />
                </div>
                <div className="flex gap-x-8">
                  <Radio
                    label="Publik"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="Public"
                    {...register('jenis')}
                  />
                  <Radio
                    label="Private"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="Private"
                    {...register('jenis')}
                  />
                  <Radio
                    label="Internal"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="Internal"
                    {...register('jenis')}
                  />
                </div>
              </div>

              <div>
                <TextLabel>Hari dan Waktu</TextLabel>
              </div>

              <Controller
                control={control}
                name="catatan"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait program dan kelas yg diberikan"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              <FileInput
                label="Foto Sampul Kelas"
                variant="outline"
                // accept="image/*"
                {...register('cover')}
                error={errors.cover?.message as string}
              />
            </div>

            <CardSeparator />

            <div className="flex gap-2 p-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                Simpan
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
              >
                Batal
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  )
}
