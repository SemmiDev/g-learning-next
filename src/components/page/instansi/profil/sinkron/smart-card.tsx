import { aktifSinkronAction } from '@/actions/instansi/profil/sinkron/aktif'
import { dataSinkronAction } from '@/actions/instansi/profil/sinkron/data'
import { ubahSinkronSmartAction } from '@/actions/instansi/profil/sinkron/tipe-smart'
import { ControlledInput, Form, ModalFooterButtons } from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryData } from '@/utils/query-data'
import { z } from '@/utils/zod-id'
import logoGci from '@public/images/logo/gci.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import AktifGroupButton from './aktif-group-button'
import SinkronCardContainer from './card-container'
import SinkronSmartButton from './smart-sync-button'

const TIPE = 'Smart'

const formSchema = z.object({
  token: z.string().optional(),
})

export type SinkronSmartFormSchema = {
  token?: string
}

const queryKey = ['instansi.profil.sinkron'] as const

type SinkronSmartCardProps = {
  className?: string
}

export default function SinkronSmartCard({ className }: SinkronSmartCardProps) {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: makeSimpleQueryData(dataSinkronAction),
  })

  type DataType = NonNullable<typeof data>

  const initialValues = {
    token: data?.token_smart,
  }

  const active = data?.tipe_sinkron === TIPE

  const onSubmit: SubmitHandler<SinkronSmartFormSchema> = async (data) => {
    await handleActionWithToast(ubahSinkronSmartAction(data), {
      loading: 'Menyimpan...',
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  const handleActivate = async (val: boolean) => {
    if (
      (!val && data?.tipe_sinkron !== TIPE) ||
      (val && data?.tipe_sinkron === TIPE)
    ) {
      return
    }

    await handleActionWithToast(aktifSinkronAction(val ? TIPE : ''), {
      success: `${
        val ? 'Mengaktifkan' : 'Menonaktifkan'
      } sinkronasi Smart Feeder.`,
      onSuccess: () => {
        queryClient.setQueryData(queryKey, (oldData: DataType) => ({
          ...oldData,
          tipe_sinkron: val
            ? TIPE
            : oldData.tipe_sinkron === TIPE
            ? ''
            : oldData.tipe_sinkron,
        }))
      },
    })
  }

  return (
    <SinkronCardContainer
      logo={logoGci}
      labelTop="Smart"
      labelBottom="Feeder"
      bgColor="#D40000"
      className={className}
    >
      <AktifGroupButton
        active={active}
        onActivate={() => handleActivate(true)}
        onDeactivate={() => handleActivate(false)}
      />

      <Form<SinkronSmartFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
          values: initialValues,
        }}
      >
        {({ control, reset, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-y-3 p-2">
              <ControlledInput
                name="token"
                control={control}
                errors={errors}
                label="Token Smart Feeder"
                placeholder="Masukkan token di sini"
              />
            </div>

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              cancel="Batal"
              onCancel={() => reset()}
              className="p-2 mt-4"
            />
          </>
        )}
      </Form>

      <SinkronSmartButton className="mt-1" />
    </SinkronCardContainer>
  )
}
