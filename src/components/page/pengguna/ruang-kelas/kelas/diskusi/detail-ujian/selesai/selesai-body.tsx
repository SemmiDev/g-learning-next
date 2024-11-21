'use client'

import { lihatHasilUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/peserta/lihat-hasil-ujian'
import { Button, Card, CardSeparator, Text, Time, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import { useParams } from 'next/navigation'

export default function SelesaiUjianBody() {
  const router = useRouter()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data } = useQuery({
    queryKey: [
      'pengguna.ruang-kelas.ujian.hasil-ujian',
      'peserta',
      idKelas,
      id,
    ],
    queryFn: makeSimpleQueryDataWithParams(lihatHasilUjianAction, idKelas, id),
  })

  return (
    <div className="flex justify-center gap-8 py-10 px-2 md:px-10 lg:px-24 xl:px-40">
      <Card className="flex flex-col w-full rounded-md overflow-clip max-w-[500px] p-0">
        <div className="flex justify-center bg-success px-4 py-4">
          <Title as="h3" className="text-white">
            {data?.aktifitas.judul || '-'}
          </Title>
        </div>
        <div className="px-2 py-3">
          <Card className="p-0">
            <Text weight="semibold" variant="dark" className="m-2">
              Hasil Ujian
            </Text>
            <CardSeparator />
            <div className="flex flex-col gap-2 p-2 xs:flex-row">
              <table className="flex-1 text-xs text-gray-dark w-full">
                <tbody>
                  <tr>
                    <td className="w-28">Jumlah pertanyaan</td>
                    <td className="w-3 text-center"> : </td>
                    <td className="font-semibold">
                      {data?.bank_soal?.jumlah_soal_yang_digunakan ?? '-'}
                    </td>
                  </tr>
                  <tr>
                    <td>Benar/salah/kosong</td>
                    <td className="text-center"> : </td>
                    <td className="font-semibold">{`${
                      data?.jawaban.jawaban_benar ?? '-'
                    } / ${data?.jawaban.jawaban_salah ?? '-'} / ${
                      data?.jawaban.jawaban_kosong ?? '-'
                    }`}</td>
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
              <div className="flex flex-col items-center bg-gray-50 w-24 rounded-md self-center p-3">
                <Text size="sm" weight="medium" variant="lighter">
                  Nilai
                </Text>
                <Text size="3xl" weight="bold" variant="dark" className="mt-1">
                  {data?.jawaban.skor_akhir ?? '-'}
                </Text>
              </div>
            </div>
            <CardSeparator />
            <div className="p-2">
              <Button
                className="w-full"
                onClick={() => {
                  router.replace(
                    `${routes.pengguna.ruangKelas}/${idKelas}/diskusi/ujian/${id}`
                  )
                }}
              >
                Kembali
              </Button>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
