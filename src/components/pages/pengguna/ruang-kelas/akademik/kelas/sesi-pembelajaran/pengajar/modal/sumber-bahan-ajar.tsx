import {
  ControlledKelas,
  ControlledSelect,
  Form,
  FormError,
  KelasItemType,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { deskripsiSemester } from '@/utils/semester'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

export type SumberBahanAjarFormSchema = {
  semester?: SelectOptionType
  kelas?: KelasItemType
}

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

type SumberBahanAjarModalProps = {
  show: boolean
  defaultKelas?: KelasItemType
  onNext: () => void
  onHide: () => void
  onSelect: (kelas: KelasItemType) => void
}

export default function SumberBahanAjarModal({
  show,
  defaultKelas,
  onNext,
  onHide,
  onSelect,
}: SumberBahanAjarModalProps) {
  const { makeSimpleApiQueryData } = useSessionJwt()
  const size = useAutoSizeMediumModal()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

  const initialValues: SumberBahanAjarFormSchema = {
    kelas: defaultKelas,
  }

  const formSchema = z.object({
    semester: z.any().optional(),
    kelas: z
      .any()
      .superRefine(objectRequired)
      .refine((value) => value?.id !== idKelas, {
        message: 'Kelas sumber tidak boleh sama dengan kelas saat ini',
      }),
  })

  const onSubmit: SubmitHandler<SumberBahanAjarFormSchema> = async (data) => {
    if (data.kelas) onSelect(data.kelas)

    onNext()
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Pilih Sumber Bahan Ajar"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<SumberBahanAjarFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
          values: initialValues,
        }}
        flexing
      >
        {({
          control,
          watch,
          setValue,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledSelect
                name="semester"
                control={control}
                options={semesterOptions}
                label="Semester"
                placeholder="Semester Aktif"
                errors={errors}
                onChange={() => setValue('kelas', undefined)}
                isClearable
              />

              <ControlledKelas
                name="kelas"
                control={control}
                errors={errors}
                label="Pilih Kelas"
                type="Pengajar"
                semester={watch('semester')?.value}
                defaultSearch={dataKelas?.kelas.nama_kelas}
                required
              />

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Lanjut"
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
