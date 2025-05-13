import {
  ControlledAsyncPaginateSelect,
  ControlledInput,
  ControlledPassword,
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
  TextSpan,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { paketInstansiSelectDataApi } from '@/services/api/admin/async-select/paket-instansi'
import { lihatInstansiApi } from '@/services/api/admin/instansi/lihat'
import { ubahInstansiApi } from '@/services/api/admin/instansi/ubah'
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { processData } from '@/utils/process-data'
import { deskripsiSemester } from '@/utils/semester'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { semesterOptions } from './tambah'

const formSchema = z.object({
  nama: z.string().pipe(required),
  kontak: z.string().pipe(required),
  pimpinan: z.string().pipe(required),
  kontakPimpinan: z.string().pipe(required),
  jenis: z.any().superRefine(objectRequired),
  paket: z.any().superRefine(objectRequired),
  usernameAdmin: z.string().pipe(required),
  passwordAdmin: z.string().pipe(requiredPassword).optional().or(z.literal('')),
  semester: z.any().optional(),
  urlSmart: z.string().optional(),
  hostSmart: z.string().optional(),
})

export type UbahInstansiFormSchema = {
  nama?: string
  kontak?: string
  pimpinan?: string
  kontakPimpinan?: string
  jenis?: SelectOptionType
  paket?: SelectOptionType
  usernameAdmin?: string
  passwordAdmin?: string
  semester?: SelectOptionType
  urlSmart?: string
  hostSmart?: string
}

const jenisOptions: SelectOptionType[] = [
  selectOption('Instansi'),
  selectOption('Bimbel'),
]

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahModal({ id, show, onHide }: UbahModalProps) {
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.instansi.table.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahInstansiFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatInstansiApi(jwt, id)

      const semesterAktif = data?.instansi?.semester_aktif

      return {
        nama: data?.instansi?.nama,
        kontak: data?.instansi?.telepon_instansi,
        pimpinan: data?.instansi?.nama_pimpinan,
        kontakPimpinan: data?.instansi?.telepon_pimpinan,
        jenis: processData(
          data?.instansi?.jenis,
          (val) => selectOption(val),
          undefined
        ),
        paket: data?.paket_instansi?.id
          ? {
              value: data?.paket_instansi?.id,
              label: data?.paket_instansi?.nama ?? '',
            }
          : undefined,
        usernameAdmin: data?.pengguna?.username,
        semester: semesterAktif
          ? {
              value: semesterAktif,
              label: deskripsiSemester(semesterAktif),
            }
          : undefined,
        urlSmart: data?.instansi?.url_smart,
        hostSmart: data?.instansi?.host_smart,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahInstansiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahInstansiApi(jwt, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['admin.instansi.table'],
        })
        queryClient.invalidateQueries({
          queryKey: ['admin.instansi.table.ubah', id],
        })
        queryClient.invalidateQueries({
          queryKey: ['admin.instansi.detail', id],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahInstansiFormSchema) => ({
            ...oldData,
            ...data,
          })
        )
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
      title="Ubah Instansi"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={336} />
      ) : (
        <Form<UbahInstansiFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
          flexing
        >
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="nama"
                  control={control}
                  errors={errors}
                  label="Nama Instansi"
                  placeholder="Nama Instansi"
                  required
                />

                <ControlledInput
                  name="kontak"
                  control={control}
                  errors={errors}
                  label="Nomor Kontak Instansi"
                  placeholder="08xxxxxxx"
                  required
                />

                <ControlledInput
                  name="pimpinan"
                  control={control}
                  errors={errors}
                  label="Nama Pimpinan"
                  placeholder="Nama Pimpinan"
                  required
                />

                <ControlledInput
                  name="kontakPimpinan"
                  control={control}
                  errors={errors}
                  label="Nomor Kontak Pimpinan"
                  placeholder="08xxxxxxx"
                  required
                />

                <ControlledSelect
                  name="jenis"
                  control={control}
                  options={jenisOptions}
                  label="Jenis Instansi"
                  placeholder="Pilih Jenis Instansi"
                  errors={errors}
                  required
                />

                <ControlledAsyncPaginateSelect
                  name="paket"
                  control={control}
                  label="Paket"
                  placeholder="Pilih Paket"
                  action={paketInstansiSelectDataApi}
                  construct={(data) => ({
                    label: data.nama,
                    value: data.id,
                  })}
                  errors={errors}
                  required
                />

                <ControlledInput
                  name="usernameAdmin"
                  control={control}
                  errors={errors}
                  label="Username Admin Instansi"
                  placeholder="Username Admin Instansi"
                  required
                />

                <ControlledPassword
                  name="passwordAdmin"
                  control={control}
                  errors={errors}
                  label={
                    <TextSpan>
                      Kata Sandi Baru Admin Instansi{' '}
                      <small>(Kosongkan jika tidak ingin mengganti)</small>
                    </TextSpan>
                  }
                  placeholder="Kata Sandi untuk Admin Instansi"
                />

                <ControlledSelect
                  name="semester"
                  control={control}
                  options={semesterOptions}
                  label="Semester Aktif"
                  placeholder="Pilih Semester"
                  errors={errors}
                />

                <ControlledInput
                  name="urlSmart"
                  control={control}
                  errors={errors}
                  label="Url Smart"
                  placeholder="Contoh: http://10.0.0.1:8000"
                />

                <ControlledInput
                  name="hostSmart"
                  control={control}
                  errors={errors}
                  label="Host Smart"
                  placeholder="Contoh: smart.contoh-univ.ac.id"
                />

                <FormError error={formError} />
              </div>

              <ModalFooterButtons
                submit="Simpan"
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
                borderTop
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
