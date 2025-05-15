import { Button, Text, TextSpan, Time } from '@/components/ui'
import Loader from '@/components/ui/loader'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { prosesPullSmartApi } from '@/services/api/instansi/profil/sinkron/smart/proses-pull'
import { statusSinkronSmartApi } from '@/services/api/instansi/profil/sinkron/smart/status'
import { useSyncStore } from '@/stores/sync'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import logoGci from '@public/images/logo/gci.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { GrSync } from 'react-icons/gr'
import { Progressbar } from 'rizzui'
import SyncOptionModal from './modal/sync-option'

const queryKey = ['instansi.profil.sinkron.smart']

type SinkronSmartButtonProps = {
  className?: string
}

export default function SinkronSmartButton({
  className,
}: SinkronSmartButtonProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const { isSyncing, setIsSyncing } = useSyncStore()

  const [showSync, setShowSync] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await statusSinkronSmartApi(jwt)

      const startTimes = [
        data?.sync_log_dosen.start_time !== '0001-01-01T00:00:00Z'
          ? parseDate(data?.sync_log_dosen.start_time)
          : null,
        data?.sync_log_kelas.start_time !== '0001-01-01T00:00:00Z'
          ? parseDate(data?.sync_log_kelas.start_time)
          : null,
        data?.sync_log_mahasiswa.start_time !== '0001-01-01T00:00:00Z'
          ? parseDate(data?.sync_log_mahasiswa.start_time)
          : null,
        data?.sync_log_perkuliahan.start_time !== '0001-01-01T00:00:00Z'
          ? parseDate(data?.sync_log_perkuliahan.start_time)
          : null,
      ].filter((time) => !!time)

      const endTimes = [
        !!data?.sync_log_dosen.end_time
          ? parseDate(data?.sync_log_dosen.end_time)
          : null,
        !!data?.sync_log_kelas.end_time
          ? parseDate(data?.sync_log_kelas.end_time)
          : null,
        !!data?.sync_log_mahasiswa.end_time
          ? parseDate(data?.sync_log_mahasiswa.end_time)
          : null,
        !!data?.sync_log_perkuliahan.end_time
          ? parseDate(data?.sync_log_perkuliahan.end_time)
          : null,
      ].filter((time) => !!time)

      const isFinished = (data?.persentase_keseluruhan ?? 0) === 100
      const isStarted =
        (startTimes.length > 0 || (data?.persentase_keseluruhan ?? 0) > 0) &&
        !isFinished

      setIsSyncing(isStarted)

      return {
        ...data,
        finished: isFinished,
        last_sync:
          endTimes.length > 0
            ? endTimes.reduce(function (a, b) {
                return a > b ? a : b
              })
            : null,
      }
    },
    refetchInterval: isSyncing ? 1000 : false,
  })

  const handlePullSync = async (semester: string) => {
    const { success, message } = await prosesPullSmartApi(jwt, semester)

    if (success) {
      setIsSyncing(true)
      queryClient.setQueryData(
        queryKey,
        (oldData: typeof data) =>
          ({
            ...oldData,
            persentase_keseluruhan: 0,
            finished: false,
          } as typeof data)
      )
      toast.success(<Text>{message}</Text>)
    } else {
      toast.error(<Text>{message}</Text>)
    }
  }

  /* TODO: fitur sync push ke smart jika sudah ada API */
  const handlePushSync = async (semester: string) => {
    toast.error(<Text>Fitur ini masih belum dapat digunakan</Text>)
  }

  if (isLoading) return <Loader className="py-6" />

  return (
    <>
      <div className={cn('flex flex-col gap-y-1 p-2', className)}>
        {isSyncing && !data?.finished ? (
          <>
            <div className="flex justify-between gap-x-2">
              <Text size="xs" weight="medium">
                Proses Sinkronisasi Data
              </Text>
              <Text size="xs" weight="medium">
                {data?.persentase_keseluruhan ?? 0}%
              </Text>
            </div>
            <div className="pb-1">
              <Progressbar
                value={data?.persentase_keseluruhan ?? 0}
                size="lg"
                color="success"
                rounded="none"
                className="gap-0"
                barClassName="transition-all duration-700 ease-in-out"
              />
            </div>
          </>
        ) : (
          <>
            {data?.last_sync && (
              <Text size="xs" weight="medium" variant="lighter">
                Sinkronkan Data Terakhir:{' '}
                <TextSpan color="gray" variant="dark">
                  <Time date={data?.last_sync} format="datetime" />
                </TextSpan>
              </Text>
            )}
            <Button variant="outline" onClick={() => setShowSync(true)}>
              <GrSync className="mr-2" /> Sinkronkan Data
            </Button>
          </>
        )}
      </div>

      <SyncOptionModal
        logo={logoGci}
        labelTop="Smart"
        labelBottom="Campus"
        bgColor="#D40000"
        show={showSync}
        setShow={setShowSync}
        onSyncPush={handlePushSync}
        onSyncPull={handlePullSync}
      />
    </>
  )
}
