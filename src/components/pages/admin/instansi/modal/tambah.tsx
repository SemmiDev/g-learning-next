import {
  ControlledAsyncPaginateSelect,
  ControlledInput,
  ControlledPassword,
  ControlledSelect,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { paketInstansiSelectDataApi } from '@/services/api/admin/async-select/paket-instansi'
import { tambahInstansiApi } from '@/services/api/admin/instansi/tambah'
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { deskripsiSemester } from '@/utils/semester'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  kontak: z.string().pipe(required),
  pimpinan: z.string().pipe(required),
  kontakPimpinan: z.string().pipe(required),
  jenis: z.any().superRefine(objectRequired),
  paket: z.any().superRefine(objectRequired),
  usernameAdmin: z.string().pipe(required),
  passwordAdmin: z.string().pipe(requiredPassword),
  semester: z.any().optional(),
  urlSmart: z.string().optional(),
  hostSmart: z.string().optional(),
})

export type TambahInstansiFormSchema = {
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

const currentYear = new Date().getFullYear()
export const semesterOptions: SelectOptionType<string>[] = [...Array(20)].map(
  (_, idx) => {
    const semester = `${currentYear - Math.floor(idx / 2)}${
      (idx % 2) % 2 == 0 ? 2 : 1
    }`

    return {
      value: semester,
      label: deskripsiSemester(semester),
    }
  }
)

const initialValues: TambahInstansiFormSchema = {}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModal({
  show = false,
  setShow,
}: TambahModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahInstansiFormSchema> = async (data) => {
    await handleActionWithToast(processApi(tambahInstansiApi, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.instansi.table'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Tambah Instansi"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahInstansiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
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
                label="Kata Sandi Admin Instansi"
                placeholder="Kata Sandi untuk Admin Instansi"
                required
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
              isSubmitting={isSubmitting}
              onCancel={handleClose}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
