import {
  ActionIcon,
  Button,
  ButtonSubmit,
  ContentLoader,
  ControlledInput,
  ControlledQuillEditor,
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatArtikelKnowledgeApi } from '@/services/api/admin/knowledge/artikel/lihat'
import { ubahArtikelKnowledgeApi } from '@/services/api/admin/knowledge/artikel/ubah'
import { lihatModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/lihat'
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { quillRequired } from '@/utils/validations/simple-refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { useManajemenKnowledgeSortableStore } from '../stores/sortable'

const formSchema = z.object({
  judul: z.string().pipe(required),
  level: z.object({ label: z.string(), value: z.string() }),
  isi: z.string().refine(...quillRequired),
})

export type UbahArtikelFormSchema = {
  judul?: string
  level?: SelectOptionType
  isi?: string
  modul?: string
  slug?: string
}

const levelOptions: SelectOptionType[] = [
  selectOption('Mahasiswa'),
  selectOption('Dosen'),
  selectOption('Akademik'),
]

type UbahArtikelFormProps = {
  showHeader?: boolean
  onClose?: () => void
}

export default function UbahArtikelForm({
  showHeader,
  onClose,
}: UbahArtikelFormProps) {
  const queryClient = useQueryClient()
  const { processApi, makeSimpleApiQueryData } = useSessionJwt()

  const { updateArtikelItem } = useManajemenKnowledgeSortableStore()

  const [ubahArtikel, setUbahArtikel] = useQueryState('ubah-artikel')

  const [showReview, setShowReview] = useState(false)
  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.manajemen-knowledge.artikel.ubah', ubahArtikel]

  const {
    data: initialValues = {},
    isLoading,
    isFetching,
  } = useQuery<UbahArtikelFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!ubahArtikel) return {}

      const { data } = await processApi(lihatArtikelKnowledgeApi, ubahArtikel)

      return {
        judul: data?.judul,
        level: levelOptions.find((item) => item.value === data?.level),
        isi: data?.isi,
        modul: data?.id_modul,
        slug: data?.slug,
      }
    },
  })

  const { modul: idModul, slug } = initialValues

  const {
    data: dataModul,
    isLoading: isLoadingModul,
    isFetching: isFetchingModul,
  } = useQuery({
    queryKey: ['admin.manajemen-knowledge.modul.lihat', idModul],
    queryFn: makeSimpleApiQueryData(lihatModulKnowledgeApi, idModul || ''),
    enabled: !!idModul,
  })

  const onSubmit: SubmitHandler<UbahArtikelFormSchema> = async (data) => {
    if (!ubahArtikel) return

    await handleActionWithToast(
      processApi(ubahArtikelKnowledgeApi, ubahArtikel, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: ({ data: resData }) => {
          queryClient.setQueryData(
            queryKey,
            (oldData: UbahArtikelFormSchema) => ({
              ...oldData,
              ...data,
              isi: resData?.isi,
            })
          )

          updateArtikelItem(
            ubahArtikel,
            data.judul || '',
            data.level?.value || ''
          )
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  if (isLoading) return <ContentLoader height={460} />

  if (!ubahArtikel) return null

  return (
    <>
      <Form<UbahArtikelFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          values: initialValues,
          defaultValues: initialValues,
        }}
        flexing
      >
        {({ control, formState: { errors, isSubmitting, isDirty } }) => (
          <>
            <div className="flex flex-col gap-4 p-2">
              {showHeader && (
                <div className="flex items-center justify-between gap-2 flex-wrap-reverse">
                  <div className="flex gap-0.5 flex-wrap">
                    {isLoadingModul ? (
                      <Loader size="sm" color="primary" />
                    ) : (
                      <Title as="h4" size="base" weight="semibold">
                        {dataModul?.nama || '-'}
                      </Title>
                    )}
                    {(isFetching || isFetchingModul) && (
                      <Loader size="sm" variant="pulse" />
                    )}
                  </div>
                  <div className="flex justify-end gap-2 flex-grow">
                    <Button
                      color="info"
                      disabled={isDirty}
                      onClick={() => setShowReview(true)}
                    >
                      Review
                    </Button>
                    <ButtonSubmit
                      color="warning"
                      isSubmitting={isSubmitting}
                      disabled={!isDirty}
                      className="sm:px-4 sm:py-2 sm:text-sm sm:min-h-10"
                    >
                      Simpan
                    </ButtonSubmit>
                    <ActionIcon
                      variant="text"
                      color="gray"
                      onClick={() => setUbahArtikel(null)}
                      className="text-gray-lighter sm:p-1 sm:w-9 sm:h-9"
                    >
                      <MdClose className="size-4" />
                    </ActionIcon>
                  </div>
                </div>
              )}

              <FormError error={formError} />

              <div className="flex gap-2 flex-wrap">
                <ControlledInput
                  name="judul"
                  control={control}
                  errors={errors}
                  label="Judul Artikel"
                  placeholder="Tulis judul artikel di sini"
                  className="flex-1"
                  required
                />

                <ControlledSelect
                  name="level"
                  control={control}
                  options={levelOptions}
                  label="Level"
                  placeholder="Pilih Level"
                  errors={errors}
                  className="w-full sm:w-36"
                  required
                />
              </div>

              <ControlledQuillEditor
                name="isi"
                control={control}
                errors={errors}
                label="Isi Artikel"
                placeholder="Tulis isi artikel di sini"
                size={showHeader ? 'xl' : 'lg'}
                toolbar="rich"
                className="text-gray-dark"
                toolbarImage
                required
              />
            </div>

            <ModalFooterButtons
              submit="Simpan"
              submitColor="warning"
              isSubmitting={isSubmitting}
              onCancel={onClose}
              className="md:hidden"
              borderTop
            />
          </>
        )}
      </Form>

      <Modal
        size="full"
        title="Review Artikel"
        isOpen={showReview}
        onClose={() => setShowReview(false)}
      >
        <iframe
          src={`${process.env.NEXT_PUBLIC_KNOWLEDGE_URL}/artikel/${slug}?review=true`}
          className="flex-1"
        />
      </Modal>
    </>
  )
}
