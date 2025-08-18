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
import { deskripsiSemester } from '@/utils/semester'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  semester: z.any().optional(),
  kelas: z.any().superRefine(objectRequired),
})

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

const initialValues: SumberBahanAjarFormSchema = {}

type SumberBahanAjarModalProps = {
  show: boolean
  onHide: () => void
  onSelect: (idKelas: string) => void
}

export default function SumberBahanAjarModal({
  show,
  onHide,
  onSelect,
}: SumberBahanAjarModalProps) {
  const size = useAutoSizeMediumModal()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<SumberBahanAjarFormSchema> = async (data) => {
    if (data.kelas?.id) onSelect(data.kelas?.id)

    onHide()
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
                placeholder="Pilih Semester"
                errors={errors}
                onChange={() => setValue('kelas', undefined)}
              />

              <ControlledKelas
                name="kelas"
                control={control}
                errors={errors}
                label="Pilih Kelas"
                type="Pengajar"
                semester={watch('semester')?.value}
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
