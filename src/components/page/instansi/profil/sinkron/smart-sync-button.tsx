import { Button, Text, TextSpan, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { wait } from '@/utils/wait'
import logoGci from '@public/images/logo/gci.png'
import { useState } from 'react'
import { GrSync } from 'react-icons/gr'
import { Progressbar } from 'rizzui'
import SyncOptionModal from './modal/sync-option'
import toast from 'react-hot-toast'
import { parseDate } from '@/utils/date'

type SinkronSmartButtonProps = {
  className?: string
}

export default function SinkronSmartButton({
  className,
}: SinkronSmartButtonProps) {
  const [lastSync, setLastSync] = useState(parseDate('2024-10-12 12:31:40'))
  const [showSync, setShowSync] = useState(false)
  const [progress, setProgress] = useState<number | undefined>()

  const handleSync = async () => {
    for (const p of [0, 25, 50, 75, 90, 99]) {
      setProgress(p)
      await wait(1000)
    }

    setProgress(100)
    await wait(500)

    setLastSync(new Date())
    setProgress(undefined)
    toast.success(<Text>Sinkronisasi data berhasil</Text>)
  }

  return (
    <>
      <div className={cn('flex flex-col gap-y-1 p-2', className)}>
        {progress === undefined ? (
          <>
            <Text size="xs" weight="medium" variant="lighter">
              Sinkronkan Data Terakhir:{' '}
              <TextSpan color="gray" variant="dark">
                <Time date={lastSync} format="datetime" />
              </TextSpan>
            </Text>
            <Button variant="outline" onClick={() => setShowSync(true)}>
              <GrSync className="mr-2" /> Sinkronkan Data
            </Button>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-x-2">
              <Text size="xs" weight="medium">
                Proses Sinkronisasi Data
              </Text>
              <Text size="xs" weight="medium">
                {progress}%
              </Text>
            </div>
            <div className="pb-1">
              <Progressbar
                value={progress}
                size="lg"
                color="success"
                rounded="none"
                className="gap-0"
                barClassName="transition-all duration-700 ease-in-out"
              />
            </div>
          </>
        )}
      </div>

      <SyncOptionModal
        logo={logoGci}
        labelTop="Smart"
        labelBottom="Feeder"
        bgColor="#D40000"
        show={showSync}
        setShow={setShowSync}
        onSyncPush={handleSync}
        onSyncPull={handleSync}
      />
    </>
  )
}
