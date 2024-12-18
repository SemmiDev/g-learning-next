import { tambahBerkasAction } from '@/actions/shared/pustaka-media/tambah-berkas'
import {
  Button,
  CardSeparator,
  ControlledUploadFile,
  Form,
  FormError,
  Input,
  Modal,
  ModalFooterButtons,
  TextLabel,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsPlusSquare, BsTrash } from 'react-icons/bs'

const formSchema = z.object({
  youtube: z.array(
    z.object({
      label: z.string().pipe(required),
      link: z.string().pipe(required.url()),
    })
  ),
  files: z.any().optional(),
})

export type TambahBerkasFormSchema = {
  youtube: {
    label?: string
    link?: string
  }[]
  files?: File[]
}

const initialValues: TambahBerkasFormSchema = {
  youtube: [],
}

type TambahModalProps = {
  show: boolean
  setShow(show: boolean): void
  uploadLink?: boolean
  refetchKeys: QueryKey[]
  googleDrive?: boolean
  idInstansi: string | undefined
  idFolder: string | undefined
}

export default function TambahBerkasModal({
  show = false,
  setShow,
  uploadLink = true,
  refetchKeys,
  googleDrive,
  idInstansi,
  idFolder,
}: TambahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahBerkasFormSchema> = async (data) => {
    const form = new FormData()
    if (idFolder) form.append('id_parent', idFolder)
    else if (idInstansi) form.append('id_instansi', idInstansi)
    else if (googleDrive) form.append('google_drive', 'true')

    for (let i = 0; i < data.youtube.length; i++) {
      const { label, link } = data.youtube[i]
      form.append(`labels_dan_links[${i}].label`, label ?? '')
      form.append(`labels_dan_links[${i}].link`, link ?? '')
    }

    if (data.files) {
      for (let i = 0; i < data.files.length; i++) {
        form.append('files', data.files[i])
      }
    }

    await handleActionWithToast(tambahBerkasAction(form), {
      loading: 'Menggunggah...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        for (const refetchKey of refetchKeys) {
          queryClient.invalidateQueries({ queryKey: refetchKey })
        }
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title={`${uploadLink ? 'Tambah Link/' : ''}Unggah Media`}
      size="lg"
      isOpen={show}
      onClose={handleClose}
    >
      <Form<TambahBerkasFormSchema>
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
          setValue,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              {uploadLink && (
                <div>
                  <TextLabel>Link YouTube atau Media Lainnya</TextLabel>
                  <div className="space-y-2">
                    {watch('youtube')?.map((_, idx) => {
                      return (
                        <div key={idx} className="flex gap-x-2">
                          <Input
                            placeholder="Label"
                            labelClassName="text-gray-dark font-semibold"
                            className="flex-1"
                            {...register(`youtube.${idx}.label`)}
                            error={errors.youtube?.[idx]?.label?.message}
                          />
                          <Input
                            placeholder="Masukkan link"
                            labelClassName="text-gray-dark font-semibold"
                            className="flex-1"
                            {...register(`youtube.${idx}.link`)}
                            error={errors.youtube?.[idx]?.link?.message}
                          />
                          <Button
                            size="sm"
                            variant="outline-colorful"
                            color="danger"
                            className="mt-2.5"
                            onClick={() => {
                              setValue(
                                'youtube',
                                watch('youtube').filter(
                                  (__, cIdx) => cIdx !== idx
                                )
                              )
                            }}
                          >
                            <BsTrash />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                  <Button
                    variant="text-colorful"
                    onClick={() =>
                      setValue('youtube', [
                        ...watch('youtube'),
                        {
                          label: '',
                          link: '',
                        },
                      ])
                    }
                  >
                    <BsPlusSquare className="-ms-2 me-2" /> Tambah Link Baru
                  </Button>
                </div>
              )}

              <ControlledUploadFile
                name="files"
                control={control}
                errors={errors}
                desc="(Tipe file yang bisa diupload adalah: pdf, pptx, xls, xlsx, doc, docx, png, jpeg, jpg, gif, mp4, rar, zip dengan ukuran maksimal 100 MB untuk setiap file yang dipilih )"
                multiple
                maxSize={{ size: 100, unit: 'MB' }}
              />

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
