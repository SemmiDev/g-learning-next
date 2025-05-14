import {
  Button,
  CardSeparator,
  ControlledSelect,
  ControlledUploadFile,
  Form,
  FormError,
  Input,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
  TextLabel,
} from '@/components/ui'
import { ACCEPT_FILE_EXTENSIONS, ACCEPT_IMAGE_EXTENSIONS } from '@/config/const'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahBerkasApi } from '@/services/api/shared/pustaka-media/tambah-berkas'
import { handleActionWithToast } from '@/utils/action'
import {
  checkSupportedLinkImage,
  SUPPORTED_LINK_IMAGE_ERROR_MESSAGE,
} from '@/utils/check-link-image'
import { mustBe } from '@/utils/must-be'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsPlusSquare, BsTrash } from 'react-icons/bs'

const formSchema = z.object({
  link: z.array(
    z
      .object({
        label: z.string().pipe(required),
        link: z.string().pipe(required.url()),
        tipe: z.any().optional(),
      })
      .refine(
        ({ tipe, link }) => {
          return (
            tipe.value === 'Teks' ||
            (tipe.value === 'Gambar' && checkSupportedLinkImage(link))
          )
        },
        {
          message: SUPPORTED_LINK_IMAGE_ERROR_MESSAGE,
          path: ['link'],
        }
      )
  ),
  files: z.any().optional(),
})

export type TambahBerkasFormSchema = {
  link: {
    label?: string
    link?: string
    tipe?: SelectOptionType
  }[]
  files?: File[]
}

const initialValues: TambahBerkasFormSchema = {
  link: [],
}

type TambahModalProps = {
  show: boolean
  setShow(show: boolean): void
  uploadLink?: boolean
  refetchKeys: QueryKey[]
  googleDrive?: boolean
  idInstansi: string | undefined
  idFolder: string | undefined
  imageOnly?: boolean
}

export default function TambahBerkasModal({
  show = false,
  setShow,
  uploadLink = true,
  refetchKeys,
  googleDrive,
  idInstansi,
  idFolder,
  imageOnly = false,
}: TambahModalProps) {
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const tipeOptions: SelectOptionType[] = imageOnly
    ? [{ label: 'Gambar', value: 'Gambar' }]
    : [
        { label: 'Link', value: 'Teks' },
        { label: 'Gambar', value: 'Gambar' },
      ]

  const onSubmit: SubmitHandler<TambahBerkasFormSchema> = async (data) => {
    const form = new FormData()
    if (idFolder) form.append('id_parent', idFolder)
    else if (idInstansi) form.append('id_instansi', idInstansi)
    else if (googleDrive) form.append('google_drive', 'true')

    for (let i = 0; i < data.link.length; i++) {
      const { label, link, tipe } = data.link[i]
      form.append(`labels_dan_links[${i}].label`, label ?? '')
      form.append(`labels_dan_links[${i}].link`, link ?? '')
      form.append(
        `labels_dan_links[${i}].tipe`,
        mustBe(tipe?.value, ['Teks', 'Gambar'], 'Teks')
      )
    }

    if (data.files) {
      for (let i = 0; i < data.files.length; i++) {
        form.append('files', data.files[i])
      }
    }

    await handleActionWithToast(tambahBerkasApi(jwt, form), {
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

  return (
    <Modal
      title={`${uploadLink ? 'Tambah Link/' : ''}Unggah Media`}
      size={size}
      isOpen={show}
      onClose={() => setShow(false)}
    >
      <Form<TambahBerkasFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
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
                  <TextLabel className="mb-2">
                    {imageOnly
                      ? 'Link Gambar'
                      : 'Link YouTube atau Media Lainnya'}
                  </TextLabel>
                  <div className="flex flex-col gap-y-2">
                    {watch('link')?.map((_, idx) => {
                      return (
                        <div
                          key={idx}
                          className="flex flex-col gap-2 border-b border-b-muted pb-2 last:border-b-0 sm:flex-row sm:border-b-0 sm:pb-0"
                        >
                          {!imageOnly && (
                            <ControlledSelect
                              name={`link.${idx}.tipe`}
                              control={control}
                              placeholder="Tipe"
                              options={tipeOptions}
                            />
                          )}
                          <Input
                            placeholder="Label"
                            labelClassName="text-gray-dark font-semibold"
                            className="flex-1"
                            {...register(`link.${idx}.label`)}
                            error={errors.link?.[idx]?.label?.message}
                          />
                          <Input
                            placeholder="Masukkan link"
                            labelClassName="text-gray-dark font-semibold"
                            className="flex-1"
                            {...register(`link.${idx}.link`)}
                            error={errors.link?.[idx]?.link?.message}
                          />
                          <Button
                            size="sm"
                            variant="outline-colorful"
                            color="danger"
                            className="sm:mt-1"
                            onClick={() => {
                              setValue(
                                'link',
                                watch('link').filter((__, cIdx) => cIdx !== idx)
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
                      setValue('link', [
                        ...watch('link'),
                        {
                          label: '',
                          link: '',
                          tipe: tipeOptions[0],
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
                desc={`(Ekstensi file yang bisa diupload adalah: ${
                  imageOnly
                    ? ACCEPT_IMAGE_EXTENSIONS.map((ext) => ext.slice(1)).join(
                        ', '
                      )
                    : ACCEPT_FILE_EXTENSIONS.map((ext) => ext.slice(1)).join(
                        ', '
                      )
                } dengan ukuran maksimal 100 MB untuk setiap file yang dipilih )`}
                accept={
                  imageOnly
                    ? { 'image/*': ACCEPT_IMAGE_EXTENSIONS }
                    : { '*': ACCEPT_FILE_EXTENSIONS }
                }
                multiple
                maxSize={{ size: 100, unit: 'MB' }}
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
