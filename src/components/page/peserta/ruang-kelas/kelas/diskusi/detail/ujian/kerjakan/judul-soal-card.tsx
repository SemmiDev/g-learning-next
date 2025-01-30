import { Button, Card, Text, TextSpan, Title } from '@/components/ui'
import { useGlobalStore } from '@/stores/global'
import cn from '@/utils/class-names'
import { PiSealCheck, PiSpinner } from 'react-icons/pi'

type JudulSoalCardProps = {
  judul: string
  durasi: number
  onSelesaiUjian(): void
  saved?: boolean
  className?: string
}

export default function JudulSoalCard({
  judul,
  durasi,
  onSelesaiUjian,
  saved,
  className,
}: JudulSoalCardProps) {
  const { setOpenSidebarMenu } = useGlobalStore()

  return (
    <Card
      className={cn(
        'flex justify-between items-center gap-2 px-4 py-3.5',
        className
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="text-lg line-clamp-1 mb-1 lg:text-1.5xl"
            title={judul}
          >
            {judul}
          </Title>
          {saved ? (
            <PiSealCheck className="text-info-dark" />
          ) : (
            <PiSpinner className="animate-spin text-gray-dark" />
          )}
        </div>
        <Text size="sm" weight="medium" variant="lighter">
          Durasi <span className="hidden lg:inline">pengerjaan</span>:{' '}
          <TextSpan color="gray" variant="dark">
            {durasi} menit
          </TextSpan>
        </Text>
      </div>
      <div className="flex flex-col justify-end flex-wrap gap-2 sm:flex-row">
        <Button size="sm" onClick={onSelesaiUjian}>
          <TextSpan>
            Selesaikan <TextSpan className="hidden lg:inline">Ujian</TextSpan>
          </TextSpan>
        </Button>
        <Button
          size="sm"
          color="success"
          variant="outline"
          className="lg:hidden"
          onClick={() => setOpenSidebarMenu(true)}
        >
          Daftar Soal
        </Button>
      </div>
    </Card>
  )
}
