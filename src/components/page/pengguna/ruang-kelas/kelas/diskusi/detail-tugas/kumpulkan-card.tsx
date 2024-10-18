import { lihatPengumpulanTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/peserta/lihat-pengumpulan-tugas'
import { simpanPengumpulanTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/peserta/simpan-pengumpulan-tugas'
import {
  ButtonSubmit,
  Card,
  CardSeparator,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  FileListItem,
  FilePreviewType,
  Form,
  FormError,
  ModalFilePreview,
  PustakaMediaFileType,
  Text,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { arrayRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsPlusCircle } from 'react-icons/bs'

const formSchema = z.object({
  berkas: z.array(z.any()).superRefine(arrayRequired),
  catatan: z.string().optional(),
})

export type PengumpulanTugasFormSchema = {
  berkas: PustakaMediaFileType[]
  catatan?: string
}

type KumpulkanTugasCardProps = {
  className?: string
}

export default function KumpulkanTugasCard({
  className,
}: KumpulkanTugasCardProps) {
  const queryClient = useQueryClient()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas, id: idAktifitas }: { kelas: string; id: string } =
    useParams()

  const queryKey = [
    'pengguna.ruang-kelas.diskusi.tugas.nilai',
    idKelas,
    idAktifitas,
  ]

  /* TODO: masih bermasalah API nya */
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await lihatPengumpulanTugasAction(idKelas, idAktifitas)

      return data
    },
  })

  if (!data) return null

  const initialValues: PengumpulanTugasFormSchema = {
    catatan: data.catatan_peserta,
    berkas: data.daftar_berkas_pengumpulan_tugas.map((item) => ({
      id: item.berkas.id,
      name: item.berkas.nama,
      time: item.berkas.created_at,
      link: item.berkas.url,
      extension: item.berkas.ekstensi,
      folder: false,
      size: getFileSize(item.berkas),
      type: getFileType(item.berkas),
      driveId: item.berkas.id_instansi ?? undefined,
    })),
  }

  const onSubmit: SubmitHandler<PengumpulanTugasFormSchema> = async (data) => {
    await handleActionWithToast(
      simpanPengumpulanTugasAction(idKelas, idAktifitas, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
          })
          queryClient.setQueryData(
            queryKey,
            (oldData: PengumpulanTugasFormSchema) => ({
              ...oldData,
              ...data,
            })
          )
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Tugas Kamu
        </Title>
        <CardSeparator />
        <div className="flex justify-between p-2">
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              Catatan dari pengajar
            </Text>
            <SanitizeHTML
              html={data?.catatan_pengajar || '-'}
              className="text-gray-dark"
            />
          </div>
          <div className="flex flex-col items-center bg-green-100 w-24 rounded-md p-3">
            <Text size="sm" weight="medium" variant="lighter">
              Nilai
            </Text>
            <Text size="3xl" weight="bold" variant="dark" className="mt-1">
              {data.nilai || '-'}
            </Text>
          </div>
        </div>
        <CardSeparator />

        <Form<PengumpulanTugasFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({
            control,
            setValue,
            watch,
            formState: { errors, isSubmitting },
          }) => (
            <>
              <div className="flex flex-col space-y-2 p-2">
                <ControlledPustakaMedia
                  name="berkas"
                  control={control}
                  errors={errors}
                  hideSelected
                  multiple
                >
                  <div className="flex justify-center items-center flex-1 space-x-1">
                    <Text size="sm" weight="semibold" color="primary">
                      Tambah Berkas
                    </Text>
                    <BsPlusCircle className="text-primary" />
                  </div>
                </ControlledPustakaMedia>

                <div className="flex flex-col space-y-2">
                  {watch('berkas').map((file, idx) => (
                    <FileListItem
                      key={file.id + idx}
                      file={file}
                      onPreview={(file) => {
                        if (!file.link) return

                        setFilePreview({
                          url: file.link,
                          extension: file.extension,
                        })
                      }}
                      onDelete={() => {
                        setValue(
                          'berkas',
                          watch('berkas').filter((item) => item.id !== file.id)
                        )
                      }}
                    />
                  ))}
                </div>

                <ControlledQuillEditor
                  name="catatan"
                  control={control}
                  errors={errors}
                  toolbar="minimalist"
                  size="sm"
                  label="Catatan"
                  placeholder="Tulis catatan terkait tugas yang kamu kumpulkan"
                />

                <FormError
                  error={formError}
                  onClose={() => setFormError(undefined)}
                />
              </div>

              <CardSeparator />

              <div className="flex flex-col p-2">
                <ButtonSubmit
                  color={data.status_pengumpulan ? 'warning' : 'primary'}
                  isSubmitting={isSubmitting}
                >
                  Kumpulkan {data.status_pengumpulan && 'Ulang'} Tugas
                </ButtonSubmit>
              </div>
            </>
          )}
        </Form>
      </Card>

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />
    </>
  )
}
