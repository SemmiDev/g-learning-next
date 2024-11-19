import { Button, Card, Text, TextSpan, Title } from '@/components/ui'
import { useGlobalStore } from '@/stores/global'
import cn from '@/utils/class-names'

type JudulSoalCardProps = {
  judul: string
  durasi: number
  onSelesaiUjian(): void
  className?: string
}

export default function JudulSoalCard({
  judul,
  durasi,
  onSelesaiUjian,
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
        <Title
          as="h4"
          size="1.5xl"
          weight="semibold"
          className="text-lg mb-1 lg:text-1.5xl"
        >
          {judul}
        </Title>
        <Text size="sm" weight="medium" variant="lighter">
          Durasi pengerjaan:{' '}
          <TextSpan color="gray" variant="dark">
            {durasi} menit
          </TextSpan>
        </Text>
      </div>
      <div className="flex justify-end flex-wrap gap-2">
        <Button size="sm" onClick={onSelesaiUjian}>
          Selesaikan Ujian
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
