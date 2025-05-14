import {
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/instansi/profil/detail/data'
import { ubahSemesterAktifApi } from '@/services/api/instansi/profil/detail/ubah-semester-aktif'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { deskripsiSemester } from '@/utils/semester'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  semester: z.any().optional(),
})

export type UbahSemesterAktifFormSchema = {
  semester?: SelectOptionType
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

type UbahSemesterAktifModalProps = {
  show: boolean
  setShow(show: boolean): void
}

export default function UbahSemesterAktifModal({
  show,
  setShow,
}: UbahSemesterAktifModalProps) {
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['instansi.profil'],
    queryFn: makeSimpleQueryDataWithParams(dataProfilApi, jwt),
  })

  const semesterAktif = data?.instansi.semester_aktif

  const initialValues: UbahSemesterAktifFormSchema = {
    semester: semesterAktif
      ? { value: semesterAktif, label: deskripsiSemester(semesterAktif) }
      : undefined,
  }

  const onSubmit: SubmitHandler<UbahSemesterAktifFormSchema> = async (data) => {
    await handleActionWithToast(ubahSemesterAktifApi(jwt, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({ queryKey: ['instansi.profil'] })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  useEffect(() => {
    if (show) refetch()
  }, [show, refetch])

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Semester Aktif"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="sm"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={547} />
      ) : (
        <Form<UbahSemesterAktifFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledSelect
                  name="semester"
                  control={control}
                  options={semesterOptions}
                  label="Semester Aktif"
                  placeholder="Pilih Semester"
                  errors={errors}
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
