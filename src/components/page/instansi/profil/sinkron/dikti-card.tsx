import { aktifSinkronAction } from '@/actions/instansi/profil/sinkron/aktif'
import { dataSinkronAction } from '@/actions/instansi/profil/sinkron/data'
import { ubahSinkronDiktiAction } from '@/actions/instansi/profil/sinkron/tipe-dikti'
import {
  ControlledInput,
  ControlledPassword,
  Form,
  ModalFooterButtons,
} from '@/components/ui'
import { useSyncStore } from '@/stores/sync'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryData } from '@/utils/query-data'
import { z } from '@/utils/zod-id'
import logoDikti from '@public/images/logo/dikti.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import AktifGroupButton from './aktif-group-button'
import SinkronCardContainer from './card-container'

const TIPE = 'Feeder'

const formSchema = z.object({
  url: z.string().url().optional().or(z.literal('')),
  username: z.string().optional(),
  password: z.string().optional(),
})

export type SinkronDiktiFormSchema = {
  url?: string
  username?: string
  password?: string
}

const queryKey = ['instansi.profil.sinkron'] as const

type SinkronDiktiCardProps = {
  className?: string
}

export default function SinkronDiktiCard({ className }: SinkronDiktiCardProps) {
  const queryClient = useQueryClient()
  const { isSyncing } = useSyncStore()

  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: makeSimpleQueryData(dataSinkronAction),
  })

  type DataType = NonNullable<typeof data>

  const initialValues = {
    url: data?.url_ws_feeder,
    username: data?.username_feeder,
    password: data?.kata_sandi_feeder,
  }

  const active = data?.tipe_sinkron === TIPE

  const onSubmit: SubmitHandler<SinkronDiktiFormSchema> = async (data) => {
    await handleActionWithToast(ubahSinkronDiktiAction(data), {
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
      } sinkronasi Feeder PDDIKTI.`,
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
      logo={logoDikti}
      labelTop="Feeder"
      labelBottom="PDDIKTI"
      bgColor="#1C4B85"
      className={className}
    >
      <AktifGroupButton
        active={active}
        onActivate={() => handleActivate(true)}
        onDeactivate={() => handleActivate(false)}
      />

      <Form<SinkronDiktiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
          values: initialValues,
        }}
      >
        {({ control, reset, formState: { errors, isSubmitting, isDirty } }) => (
          <>
            <div className="flex flex-col gap-y-3 p-2">
              <ControlledInput
                name="url"
                control={control}
                errors={errors}
                type="url"
                label="URL Feeder"
                placeholder="URL Feeder"
                disabled={isSyncing}
              />

              <ControlledInput
                name="username"
                control={control}
                errors={errors}
                label="Username Feeder"
                placeholder="Username Feeder"
                disabled={isSyncing}
              />

              <ControlledPassword
                name="password"
                control={control}
                errors={errors}
                label="Katasandi Feeder"
                placeholder="Katasandi Feeder"
                disabled={isSyncing}
              />
            </div>

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              cancel="Batal"
              onCancel={() => reset()}
              className="p-2 mt-4"
              disabled={isSyncing || !isDirty}
            />
          </>
        )}
      </Form>
    </SinkronCardContainer>
  )
}
