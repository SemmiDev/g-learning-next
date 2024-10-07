import { Card, CardSeparator, Text, Time, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsClipboard2Plus } from 'react-icons/bs'

export default function DaftarTugasCard({ className }: { className?: string }) {
  /* TODO: Tampilkan Semua Tugas di Kelas dari API */

  const listTugas = [
    {
      judul: 'Judul tugas yang diberikan pengajar A',
      batasWaktu: '2024-05-08T13:15:00Z',
    },
    {
      judul: 'Sebuah judul tugas yang diberikan pengajar C',
      batasWaktu: '2024-05-08T13:15:00Z',
    },
    {
      judul: 'Judul tugas yang diberikan pengajar B',
      batasWaktu: '2024-05-08T13:15:00Z',
    },
  ]

  return (
    <>
      <Card className={cn('p-0', className)}>
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Daftar Tugas
        </Title>
        <CardSeparator />
        <div className="flex flex-col space-y-3 px-2 py-3">
          {listTugas.map((item, idx) => (
            <DaftarTugasItem
              judul={item.judul}
              batasWaktu={item.batasWaktu}
              key={idx}
            />
          ))}
        </div>
      </Card>
    </>
  )
}

type DaftarTugasItemProps = {
  judul: string
  batasWaktu: string
}

function DaftarTugasItem({ judul, batasWaktu }: DaftarTugasItemProps) {
  return (
    <div className="flex space-x-2">
      <div className="flex justify-center items-center size-9 btn-item-violet rounded">
        <BsClipboard2Plus size={17} />
      </div>
      <div className="flex flex-col">
        <Text size="sm" weight="semibold" variant="dark">
          {judul}
        </Text>
        <Text size="2xs" weight="medium" variant="lighter">
          Batas waktu: <Time date={batasWaktu} format="datetime" />
        </Text>
      </div>
    </div>
  )
}
