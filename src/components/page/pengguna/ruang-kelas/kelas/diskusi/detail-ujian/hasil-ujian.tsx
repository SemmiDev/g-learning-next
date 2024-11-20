import { lihatHasilUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/peserta/lihat-hasil-ujian'
import {
  Button,
  Card,
  CardSeparator,
  Shimmer,
  Text,
  Time,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
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

  const { data, isLoading } = useQuery({
    queryKey: [
      'pengguna.ruang-kelas.ujian.hasil-ujian',
      'peserta',
      idKelas,
      id,
    ],
    queryFn: makeSimpleQueryDataWithParams(lihatHasilUjianAction, idKelas, id),
  })

  if (isLoading) return <CardShimmer className={className} />

  const selesai = !!data?.jawaban.waktu_selesai
  const jadwalMulai = parseDate(data?.aktifitas.waktu_mulai_ujian)
  const jadwalSelesai = parseDate(data?.aktifitas.waktu_selesai_ujian)
  const dalamJadwal =
    !!jadwalMulai &&
    !!jadwalSelesai &&
    jadwalMulai <= new Date() &&
    jadwalSelesai >= new Date()

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
                <td>Benar/salah/kosong</td>
                <td className="text-center"> : </td>
                <td className="font-semibold">
                  {selesai
                    ? `${data?.jawaban.jawaban_benar ?? '-'} /
                      ${data?.jawaban.jawaban_salah ?? '-'} /
                      ${data?.jawaban.jawaban_kosong ?? '-'}`
                    : '- / - / -'}
                </td>
              </tr>
              <tr>
                <td>Waktu mulai</td>
                <td className="text-center"> : </td>
                <td className="font-semibold">
                  <Time
                    date={data?.jawaban.waktu_mulai}
                    format="datetime"
                    empty="-"
                  />
                </td>
              </tr>
              <tr>
                <td>Waktu selesai</td>
                <td className="text-center"> : </td>
                <td className="font-semibold">
                  <Time
                    date={data?.jawaban.waktu_selesai}
                    format="datetime"
                    empty="-"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col items-center bg-gray-50 w-24 rounded-md p-3">
            <Text size="sm" weight="medium" variant="lighter">
              Nilai
            </Text>
            <Text size="3xl" weight="bold" variant="dark" className="mt-1">
              {selesai ? data?.jawaban.skor_akhir || 0 : '-'}
            </Text>
          </div>
        </div>
        <CardSeparator />
        {(selesai || dalamJadwal) && (
          <div className="flex flex-col p-2">
            {selesai ? (
              <div className="flex-1">
                <Button className="w-full" disabled>
                  Mulai Ujian
                </Button>
              </div>
            ) : (
              <div className="flex-1">
                <Button
                  className="w-full"
                  onClick={() => setShowModalMulai(true)}
                >
                  {!!data?.jawaban.waktu_mulai ? 'Lanjut' : 'Mulai'} Ujian
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      <MulaiUjianModal
        show={showModalMulai}
        setShow={setShowModalMulai}
        jumlahSoal={data?.bank_soal?.jumlah_soal_yang_digunakan}
        durasi={data?.aktifitas.durasi_ujian || undefined}
        lanjut={!!data?.jawaban.waktu_mulai}
      />
    </>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-1/4" />
      </div>
      <CardSeparator />
      <div className="flex items-center space-x-2 p-2">
        <div className="flex flex-col space-y-2 flex-1">
          <Shimmer className="h-2.5 w-1/2" />
          <Shimmer className="h-2.5 w-1/2" />
          <Shimmer className="h-2.5 w-1/2" />
          <Shimmer className="h-2.5 w-1/2" />
        </div>
        <div className="flex flex-col items-center h-[5.25rem] w-24 bg-gray-50/80 rounded-md space-y-5 px-3 py-4">
          <Shimmer className="h-2.5 w-1/2" />
          <Shimmer className="h-5 w-1/2" />
        </div>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Shimmer className="h-8 w-full" />
      </div>
    </Card>
  )
}
