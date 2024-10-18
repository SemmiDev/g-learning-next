import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { Button, Card, CardSeparator, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import MulaiUjianModal from './modal/mulai-ujian'

type HasilUjianCardProps = {
  className?: string
}

export default function HasilUjianCard({ className }: HasilUjianCardProps) {
  const [showModalMulai, setShowModalMulai] = useState(false)

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.ujian', idKelas, id],
    queryFn: async () => {
      const { data } = await lihatAktifitasAction(idKelas, id)
      return data
    },
  })

  /* TODO: tambahkan data hasil ujian dari API jika sudah ada */

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Hasil Ujian
        </Title>
        <CardSeparator />
        <div className="flex p-2">
          <table className="flex-1 text-xs text-gray-dark">
            <tbody>
              <tr>
                <td className="w-32">Jumlah soal</td>
                <td className="w-3 text-center"> : </td>
                <td className="font-semibold">
                  {data?.bank_soal?.jumlah_soal_yang_digunakan ?? '-'}
                </td>
              </tr>
              <tr>
                <td>Benar/ salah</td>
                <td className="text-center"> : </td>
                <td className="font-semibold">-</td>
              </tr>
              <tr>
                <td>Waktu mulai</td>
                <td className="text-center"> : </td>
                <td className="font-semibold">-</td>
              </tr>
              <tr>
                <td>Waktu selesai</td>
                <td className="text-center"> : </td>
                <td className="font-semibold">-</td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col items-center bg-gray-50 w-24 rounded-md p-3">
            <Text size="sm" weight="medium" variant="lighter">
              Nilai
            </Text>
            <Text size="3xl" weight="bold" variant="dark" className="mt-1">
              -
            </Text>
          </div>
        </div>
        <CardSeparator />
        <div className="flex flex-col p-2">
          <Button onClick={() => setShowModalMulai(true)}>Mulai ujian</Button>
        </div>
      </Card>

      <MulaiUjianModal
        showModal={showModalMulai}
        setShowModal={setShowModalMulai}
        jumlahSoal={data?.bank_soal?.jumlah_soal_yang_digunakan}
        durasi={data?.aktifitas.durasi_ujian || undefined}
      />
    </>
  )
}
