import {
  ActionIcon,
  ButtonSubmit,
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
import { tambahArtikelKnowledgeApi } from '@/services/api/admin/knowledge/artikel/tambah'
import { lihatModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/lihat'
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { quillRequired } from '@/utils/validations/simple-refine'
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
  isi: z.string().refine(...quillRequired),
})

export type TambahArtikelFormSchema = {
  judul?: string
  level?: SelectOptionType
  isi?: string
}

const levelOptions: SelectOptionType[] = [
  selectOption('Mahasiswa'),
  selectOption('Dosen'),
  selectOption('Akademik'),
]

const initialValues: TambahArtikelFormSchema = {}

export default function TambahArtikelForm() {
  const queryClient = useQueryClient()
  const { makeSimpleApiQueryData, processApi } = useSessionJwt()

  const { addArtikelItem } = useManajemenKnowledgeSortableStore()
  const { idModul, ubahArtikel, tutupArtikel } =
    useManajemenKnowledgeArtikelStore()

  const [formError, setFormError] = useState<string>()

  const { data: dataModul, isLoading } = useQuery({
    queryKey: ['admin.manajemen-knowledge.modul.lihat', idModul],
    queryFn: makeSimpleApiQueryData(lihatModulKnowledgeApi, idModul),
    enabled: !!idModul,
  })

  const onSubmit: SubmitHandler<TambahArtikelFormSchema> = async (data) => {
    if (!idModul) return

    await handleActionWithToast(
      processApi(tambahArtikelKnowledgeApi, idModul, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: ({ data }) => {
          if (!data || !data.id) return

          addArtikelItem(data.id, data.judul, data.level, idModul)
          queryClient.setQueryData(
            ['admin.manajemen-knowledge.artikel.ubah', data.id],
            () => ({
              judul: data.judul,
              level: levelOptions.find((item) => item.value === data.level),
              isi: data.isi,
              modul: data.id_modul,
            })
          )
          ubahArtikel(data.id)
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  return (
    <Form<TambahArtikelFormSchema>
      onSubmit={onSubmit}
      validationSchema={formSchema}
      useFormProps={{
        mode: 'onSubmit',
        defaultValues: initialValues,
      }}
      className="flex flex-col gap-4"
    >
      {({ control, formState: { errors, isSubmitting } }) => (
        <>
          <div className="flex items-center justify-between gap-2">
            {isLoading ? (
              <Loader size="sm" color="primary" />
            ) : (
              <Title as="h4" size="base" weight="semibold">
                {dataModul?.nama || '-'}
              </Title>
            )}
            <div className="flex gap-2">
              <ButtonSubmit
                size="sm"
                isSubmitting={isSubmitting}
                disabled={isLoading}
                className="sm:px-4 sm:py-2 sm:text-sm sm:min-h-10"
              >
                Simpan
              </ButtonSubmit>
              <ActionIcon
                size="sm"
                variant="text"
                color="gray"
                className="text-gray-lighter sm:p-1 sm:w-9 sm:h-9"
                onClick={tutupArtikel}
              >
                <MdClose className="size-4" />
              </ActionIcon>
            </div>
          </div>

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
            size="xl"
            toolbar="rich"
            className="text-gray-dark"
            toolbarImage
            required
          />
        </>
      )}
    </Form>
  )
}
