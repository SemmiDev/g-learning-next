import { Card } from '@/components/ui'
import cn from '@/utils/class-names'
import DaftarSoal, { DaftarSoalProps } from './daftar-soal'

type DaftarSoalCardProps = DaftarSoalProps & {
  className?: string
}

export default function DaftarSoalCard({
  listSoal,
  currentSoal,
  setCurrentSoal,
  className,
}: DaftarSoalCardProps) {
  return (
    <Card className={cn('flex flex-col sticky top-5 p-0', className)}>
      <DaftarSoal
        listSoal={listSoal}
        currentSoal={currentSoal}
        setCurrentSoal={setCurrentSoal}
      />
    </Card>
  )
}
