import {
  ActionIcon,
  ButtonSubmit,
  ContentLoader,
  ControlledInput,
  ControlledQuillEditor,
  ControlledSelect,
  Form,
  FormError,
  Loader,
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
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { useManajemenKnowledgeArtikelStore } from '../stores/artikel'
import { useManajemenKnowledgeSortableStore } from '../stores/sortable'

const formSchema = z.object({
  judul: z.string().pipe(required),
  level: z.object({ label: z.string(), value: z.string() }),
  isi: z.string().optional(),
})

export type UbahArtikelFormSchema = {
  judul?: string
  level?: SelectOptionType
  isi?: string
  modul?: string
}

const levelOptions: SelectOptionType[] = [
  selectOption('Mahasiswa'),
  selectOption('Dosen'),
  selectOption('Akademik'),
]

export default function UbahArtikelForm() {
  const queryClient = useQueryClient()
  const { processApi, makeSimpleApiQueryData } = useSessionJwt()

  const { updateArtikelItem } = useManajemenKnowledgeSortableStore()
  const { id, tutupArtikel } = useManajemenKnowledgeArtikelStore()

  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.manajemen-knowledge.artikel.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahArtikelFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await processApi(lihatArtikelKnowledgeApi, id)

      return {
        judul: data?.judul,
        level: levelOptions.find((item) => item.value === data?.level),
        isi: data?.isi,
        modul: data?.id_modul,
      }
    },
  })

  const idModul = initialValues?.modul

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
    if (!id) return

    await handleActionWithToast(processApi(ubahArtikelKnowledgeApi, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahArtikelFormSchema) => ({
            ...oldData,
            ...data,
          })
        )

        updateArtikelItem(id, data?.judul || '')
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  if (isLoading) return <ContentLoader height={460} />

  return (
    <Form<UbahArtikelFormSchema>
      onSubmit={onSubmit}
      validationSchema={formSchema}
      useFormProps={{
        mode: 'onSubmit',
        values: initialValues,
        defaultValues: initialValues,
      }}
      className="flex flex-col gap-4"
    >
      {({ control, formState: { errors, isSubmitting } }) => (
        <>
          <div className="flex items-center justify-between gap-2">
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
            <div className="flex gap-2">
              <ButtonSubmit color="warning" isSubmitting={isSubmitting}>
                Simpan
              </ButtonSubmit>
              <ActionIcon variant="text" color="gray" onClick={tutupArtikel}>
                <MdClose className="size-4" />
              </ActionIcon>
            </div>
          </div>

          <FormError error={formError} />

          <ControlledInput
            name="judul"
            control={control}
            errors={errors}
            label="Judul Artikel"
            placeholder="Tulis judul artikel di sini"
            required
          />

          <ControlledSelect
            name="level"
            control={control}
            options={levelOptions}
            label="Level"
            placeholder="Pilih Level"
            errors={errors}
            required
          />

          <ControlledQuillEditor
            name="isi"
            control={control}
            errors={errors}
            label="Isi Artikel"
            placeholder="Tulis isi artikel di sini"
            size="xl"
            toolbar="rich"
            className="text-gray-dark"
            toolbarImage
          />
        </>
      )}
    </Form>
  )
}
