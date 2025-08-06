import {
  ButtonSubmit,
  Card,
  ControlledInput,
  ControlledQuillEditor,
  Form,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  isi: z.string().optional(),
})

export type ModulArtikelFormSchema = {
  judul?: string
  isi?: string
}

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const initialValues: ModulArtikelFormSchema = {}

  const onSubmit: SubmitHandler<ModulArtikelFormSchema> = async (data) => {
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

  return (
    <Card className={cn('overflow-visible px-4 py-3', className)}>
      <Form<ModulArtikelFormSchema>
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
              <ButtonSubmit isSubmitting={isSubmitting}>Simpan</ButtonSubmit>
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
    </Card>
  )
}
