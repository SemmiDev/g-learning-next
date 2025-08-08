import {
  ActionIcon,
  ButtonSubmit,
  ControlledInput,
  ControlledQuillEditor,
  Form,
  Title,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import { useManajemenKnowledgeArtikelStore } from './stores/artikel'

const formSchema = z.object({
  judul: z.string().pipe(required),
  isi: z.string().optional(),
})

export type TambahArtikelFormSchema = {
  judul?: string
  isi?: string
}

const initialValues: TambahArtikelFormSchema = {}

const onSubmit: SubmitHandler<TambahArtikelFormSchema> = async (data) => {
  console.log(data)

  // await handleActionWithToast(
  //   processApi(tambahBankMateriApi, idKategori, data),
  //   {
  //     loading: 'Menyimpan...',
  //     onStart: () => setFormError(undefined),
  //     onSuccess: () => {
  //       setShow(false)
  //       queryClient.invalidateQueries({
  //         queryKey: ['pengguna.bank-materi.list', idKategori],
  //       })
  //     },
  //     onError: ({ message }) => setFormError(message),
  //   }
  // )
}

export default function TambahArtikelForm() {
  const { tutupArtikel } = useManajemenKnowledgeArtikelStore()

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
            <Title as="h4" size="base" weight="semibold">
              Modul Akademik
            </Title>
            <div className="flex gap-2">
              <ButtonSubmit isSubmitting={isSubmitting}>Simpan</ButtonSubmit>
              <ActionIcon variant="text" color="gray" onClick={tutupArtikel}>
                <MdClose className="size-4" />
              </ActionIcon>
            </div>
          </div>

          <ControlledInput
            name="judul"
            control={control}
            errors={errors}
            label="Judul Artikel"
            placeholder="Tulis judul artikel di sini"
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
