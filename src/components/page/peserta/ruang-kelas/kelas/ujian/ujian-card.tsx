import { UjianItemType } from '@/app/(hydrogen)/peserta/ruang-kelas/kelas/ujian/page'
import { Button, Card, Text } from '@/components/ui'
import { useState } from 'react'
import HasilUjianModal from './modal/mulai-ujian'

type UjianCardProps = {
  listUjian: UjianItemType[]
}

export default function UjianCard({ listUjian }: UjianCardProps) {
  const [showModalHasil, setShowModalHasil] = useState(false)
  const [mulaiUjian, setMulaiUjian] = useState<UjianItemType>()

  const actionMulai = (ujian: UjianItemType) => {
    setMulaiUjian(ujian)
    setShowModalHasil(true)
  }

  return (
    <>
      <Card className="p-0">
        {listUjian.map((item, idx) => (
          <div
            className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
            key={idx}
          >
            <div className="flex flex-col">
              <Text weight="semibold" variant="dark">
                {item.judul}
              </Text>
              <Text size="sm" variant="lighter" className="mb-1">
                {item.keterangan}
              </Text>
              <Text size="sm" weight="semibold" variant="lighter">
                Batas waktu pengumpulan
              </Text>
              <Text size="sm" weight="semibold" variant="dark">
                {item.batasWaktu}
              </Text>
            </div>
            <Button
              size="sm"
              color={
                item.status === 'Sudah'
                  ? 'success'
                  : item.status === 'Belum'
                  ? 'primary'
                  : 'warning'
              }
              onClick={() => actionMulai(item)}
            >
              {item.status === 'Sudah'
                ? 'Cek Hasil Ujian'
                : item.status === 'Belum'
                ? 'Kerjakan Ujian'
                : 'Ulangi Ujian'}
            </Button>
          </div>
        ))}
      </Card>

      <HasilUjianModal
        showModal={showModalHasil}
        setShowModal={setShowModalHasil}
        ujian={mulaiUjian}
      />
    </>
  )
}
