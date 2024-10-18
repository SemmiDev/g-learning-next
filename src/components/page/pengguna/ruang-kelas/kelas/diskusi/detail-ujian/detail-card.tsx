import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { Card, CardSeparator, Komentar, Text, Time } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { BsCardChecklist } from 'react-icons/bs'
import DetailCardShimmer from '../shimmer/detail-card'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.ujian', idKelas, id],
    queryFn: async () => {
      const { data } = await lihatAktifitasAction(idKelas, id)
      return data
    },
  })

  if (isLoading) return <DetailCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Ujian') return null

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex flex-col">
            <Text size="lg" weight="semibold" variant="dark" className="mb-2">
              {data.aktifitas.judul || '-'}
            </Text>
            <SanitizeHTML
              html={data.aktifitas.deskripsi || '-'}
              className="text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50/40 border border-dashed border-gray-100 rounded-md p-2 mx-2 my-2">
          <figure className="flex justify-center items-center size-[52px] rounded btn-item-blue">
            <BsCardChecklist size={24} />
          </figure>
          <div className="flex flex-col gap-x-2 2xl:flex-row">
            <table>
              <tbody>
                <tr>
                  <td className="text-xs text-gray-lighter font-medium w-40 2xl:w-28">
                    Jumlah Soal
                  </td>
                  <td className="text-xs text-gray-dark font-semibold text-center w-2">
                    :
                  </td>
                  <td className="text-xs text-gray-dark font-semibold">
                    {data.bank_soal?.jumlah_soal_yang_digunakan}
                  </td>
                </tr>
                <tr>
                  <td className="text-xs text-gray-lighter font-medium">
                    Durasi pengerjaan
                  </td>
                  <td className="text-xs text-gray-dark font-semibold text-center">
                    :
                  </td>
                  <td className="text-xs text-gray-dark font-semibold">
                    {data.aktifitas.durasi_ujian} menit
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                {data.aktifitas.waktu_tersedia !==
                  data.aktifitas.waktu_mulai_ujian && (
                  <tr>
                    <td className="text-xs text-gray-lighter font-medium w-40 2xl:w-36">
                      Waktu mulai pengerjaan
                    </td>
                    <td className="text-xs text-gray-dark font-semibold text-center w-2">
                      :
                    </td>
                    <td className="text-xs text-gray-dark font-semibold">
                      <Time
                        date={data.aktifitas.waktu_mulai_ujian}
                        format="datetime"
                        empty="-"
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="text-xs text-gray-lighter font-medium w-40 2xl:w-36">
                    Batas waktu pengerjaan
                  </td>
                  <td className="text-xs text-gray-dark font-semibold text-center w-2">
                    :
                  </td>
                  <td className="text-xs text-gray-dark font-semibold">
                    <Time
                      date={data.aktifitas.waktu_selesai_ujian}
                      format="datetime"
                      empty="-"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-xs text-gray-lighter font-medium">
                    Jenis ujian
                  </td>
                  <td className="text-xs text-gray-dark font-semibold text-center">
                    :
                  </td>
                  <td className="text-xs text-gray-dark font-semibold">
                    {data.aktifitas.kategori_nilai}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <CardSeparator />
        <Komentar
          idKelas={idKelas}
          idAktifitas={id}
          firstShow={5}
          showPer={10}
          className="p-4"
        />
      </Card>
    </>
  )
}
