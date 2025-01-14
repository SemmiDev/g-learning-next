import { Button, Card, CardSeparator, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsPlusCircle } from 'react-icons/bs'
import KonferensiItem from './bahan-ajar-item/konferensi'
import MateriItem from './bahan-ajar-item/materi'
import TugasItem from './bahan-ajar-item/tugas'
import UjianItem from './bahan-ajar-item/ujian'

type BahanAjarCardProps = {
  className?: string
}

export default function BahanAjarCard({ className }: BahanAjarCardProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex justify-between items-start gap-x-2 p-2">
        <Text weight="semibold">Bahan Ajar</Text>
        <Button size="sm" variant="text" className="min-h-0 p-0 mt-1">
          <BsPlusCircle className="size-3 mr-1" /> Tambah bahan ajar
        </Button>
      </div>
      <CardSeparator />
      <MateriItem />
      <CardSeparator />
      <TugasItem />
      <CardSeparator />
      <UjianItem />
      <CardSeparator />
      <KonferensiItem />
    </Card>
  )
}
