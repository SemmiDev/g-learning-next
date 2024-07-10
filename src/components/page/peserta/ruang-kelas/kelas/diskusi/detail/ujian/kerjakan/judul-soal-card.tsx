import { Button, Card, Text, TextSpan, Title } from '@/components/ui'

type JudulSoalCardProps = {
  onSelesaiUjian(): void
}

export default function JudulSoalCard({ onSelesaiUjian }: JudulSoalCardProps) {
  return (
    <Card className="flex justify-between items-center px-4 py-3.5">
      <div className="flex flex-col">
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
          Judul soal di sini
        </Title>
        <Text size="sm" weight="medium" variant="lighter">
          Durasi pengerjaan:{' '}
          <TextSpan color="gray" variant="dark">
            90 menit
          </TextSpan>
        </Text>
      </div>
      <Button size="sm" onClick={onSelesaiUjian}>
        Selesaikan Ujian
      </Button>
    </Card>
  )
}
