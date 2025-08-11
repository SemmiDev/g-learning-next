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
import { tambahArtikelKnowledgeApi } from '@/services/api/admin/knowledge/artikel/tambah'
import { lihatModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/lihat'
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { useManajemenKnowledgeArtikelStore } from '../stores/artikel'
import { useManajemenKnowledgeSortableStore } from '../stores/sortable'

const formSchema = z.object({
  judul: z.string().pipe(required),
  tipe: z.object({ label: z.string(), value: z.string() }),
  isi: z.string().optional(),
})

export type TambahArtikelFormSchema = {
  judul?: string
  tipe?: SelectOptionType
  isi?: string
}

const tipeOptions: SelectOptionType[] = [
  selectOption('Mahasiswa'),
  selectOption('Dosen'),
  selectOption('Akademik'),
]

const initialValues: TambahArtikelFormSchema = {}

export default function TambahArtikelForm() {
  const { makeSimpleApiQueryData, processApi } = useSessionJwt()

  const { addArtikelItem } = useManajemenKnowledgeSortableStore()
  const { idModul, tutupArtikel } = useManajemenKnowledgeArtikelStore()

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
          if (!data?.id) return

          addArtikelItem(data?.id, data?.judul, idModul)
          tutupArtikel()
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
              <ButtonSubmit isSubmitting={isSubmitting} disabled={isLoading}>
                Simpan
              </ButtonSubmit>
              <ActionIcon
                variant="text"
                color="gray"
                className="text-gray-lighter"
                onClick={tutupArtikel}
              >
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
            name="tipe"
            control={control}
            options={tipeOptions}
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
