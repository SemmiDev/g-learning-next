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
  Shimmer,
  Text,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { DataType as DataTugasType } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import { lihatPengumpulanTugasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/peserta/lihat-pengumpulan-tugas'
import { simpanPengumpulanTugasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/peserta/simpan-pengumpulan-tugas'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { passedTime } from '@/utils/time'
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
  tugas: DataTugasType | undefined
  className?: string
}

export default function KumpulkanTugasCard({
  tugas,
  className,
}: KumpulkanTugasCardProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()

  const [filePreview, setFilePreview] = useState<FilePreviewType>()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas, id: idAktifitas }: { kelas: string; id: string } =
    useParams()

  const queryKey = [
    'pengguna.ruang-kelas.detail.tugas.kumpulkan',
    idKelas,
    idAktifitas,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryDataWithParams(
      lihatPengumpulanTugasApi,
      jwt,
      idKelas,
      idAktifitas
    ),
  })

  if (!data) return null

  const initialValues: PengumpulanTugasFormSchema = {
    catatan: data.catatan_peserta,
    berkas: (data.berkas ?? []).map((item) => ({
      id: item.id,
      name: item.nama,
      time: item.created_at,
      link: item.url,
      extension: item.ekstensi,
      folder: false,
      size: getFileSize(item),
      type: getFileType(item),
      driveId: item.id_instansi ?? undefined,
    })),
  }

  const onSubmit: SubmitHandler<PengumpulanTugasFormSchema> = async (data) => {
    await handleActionWithToast(
      simpanPengumpulanTugasApi(jwt, idKelas, idAktifitas, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey })
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  if (isLoading) return <CardShimmer className={className} />

  const terlambat = passedTime(tugas?.aktifitas.batas_waktu)

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
          <div className="flex flex-col items-center w-24 bg-gray-50 rounded-md p-3">
            <Text size="sm" weight="medium" variant="lighter">
              Nilai
            </Text>
            <Text size="3xl" weight="bold" variant="dark" className="mt-1">
              {data?.nilai || '-'}
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
              <div className="flex flex-col gap-y-2 p-2">
                <ControlledPustakaMedia
                  name="berkas"
                  control={control}
                  errors={errors}
                  hideSelected
                  multiple
                >
                  <div className="flex justify-center items-center flex-1 gap-x-1">
                    <Text size="sm" weight="semibold" color="primary">
                      Tambah Berkas
                    </Text>
                    <BsPlusCircle className="text-primary" />
                  </div>
                </ControlledPustakaMedia>

                <div className="flex flex-col gap-y-2">
                  {watch('berkas').map((file, idx) => (
                    <FileListItem
                      key={file.id + idx}
                      file={file}
                      onPreview={(file) => {
                        if (!file.link) return

                        setFilePreview({
                          url: file.link,
                          extension: file.extension,
                          image: file.type === 'image',
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
                  color={data?.status_pengumpulan ? 'warning' : 'primary'}
                  isSubmitting={isSubmitting}
                  disabled={terlambat}
                >
                  Kumpulkan {data?.status_pengumpulan && 'Ulang'} Tugas
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

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-1/2" />
      </div>
      <CardSeparator />
      <div className="flex gap-x-2 p-2">
        <div className="flex flex-col gap-y-2 flex-1">
          <Shimmer className="h-3.5 w-1/2" />
          <Shimmer className="h-2.5 w-1/3" />
        </div>
        <div className="flex flex-col items-center h-[5.25rem] w-24 bg-gray-50/80 rounded-md gap-y-5 px-3 py-4">
          <Shimmer className="h-2.5 w-1/2" />
          <Shimmer className="h-5 w-1/2" />
        </div>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Shimmer className="h-8 w-full" />
      </div>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 p-2">
        <Shimmer className="h-2.5 w-1/4" />
        <Shimmer className="h-2.5 w-1/2" />
        <Shimmer className="h-2.5 w-1/2" />
      </div>
    </Card>
  )
}
