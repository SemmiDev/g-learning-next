import {
  CardSeparator,
  ContentLoader,
  ControlledInput,
  ControlledSelect,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
  TextLabel,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatBerkasApi } from '@/services/api/shared/pustaka-media/lihat-berkas'
import { ubahLinkApi } from '@/services/api/shared/pustaka-media/ubah-link'
import { handleActionWithToast } from '@/utils/action'
import {
  checkSupportedLinkImage,
  SUPPORTED_LINK_IMAGE_ERROR_MESSAGE,
} from '@/utils/check-link-image'
import { mustBe } from '@/utils/must-be'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    nama: z.string().pipe(required),
    link: z.string().pipe(required),
    tipe: z.any().optional(),
    googleDrive: z.boolean().optional(),
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

export type UbahLinkFormSchema = {
  nama?: string
  link?: string
  tipe?: SelectOptionType
  googleDrive?: boolean
}

const tipeOptions: SelectOptionType[] = [
  { label: 'Link', value: 'Teks' },
  { label: 'Gambar', value: 'Gambar' },
]

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
  googleDrive?: boolean
  refetchKey: QueryKey
}

export default function UbahLinkModal({
  id,
  show,
  onHide,
  googleDrive,
  refetchKey,
}: UbahModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const queryKey = ['shared.pustaka-media.files.ubah-link', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahLinkFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await processApi(lihatBerkasApi, id)

      return {
        nama: data?.nama,
        link: data?.url,
        tipe: tipeOptions.find(
          (tipe) =>
            tipe.value === mustBe(data?.tipe, ['Teks', 'Gambar'], 'Teks')
        ),
        googleDrive,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahLinkFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(processApi(ubahLinkApi, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: refetchKey })
        queryClient.setQueryData(queryKey, (oldData: UbahLinkFormSchema) => ({
          ...oldData,
          ...data,
        }))
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
      title="Ubah Link"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <ContentLoader height={236} />
      ) : (
        <Form<UbahLinkFormSchema>
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
                  label="Label"
                  placeholder="Label Link"
                  required
                />

                {!googleDrive && (
                  <div className="flex flex-col">
                    <TextLabel required>Link</TextLabel>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <ControlledSelect
                        name="tipe"
                        control={control}
                        placeholder="Tipe"
                        options={tipeOptions}
                        menuPlacement="top"
                      />
                      <ControlledInput
                        name="link"
                        control={control}
                        errors={errors}
                        type="url"
                        placeholder="Masukkan link"
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}

                <FormError error={formError} />
              </div>

              <CardSeparator />

              <ModalFooterButtons
                submit="Simpan"
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
