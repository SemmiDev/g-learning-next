import { DataType } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { Text, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { BsCardChecklist } from 'react-icons/bs'

type UjianItemProps = {
  data: DataType
  className?: string
}

export default function UjianItem({ data, className }: UjianItemProps) {
  if (!data.aktifitas) return null

  return (
    <div className={cn('flex gap-x-2 px-2 py-4', className)}>
      <div className="flex justify-center items-center size-[2.625rem] btn-item-blue rounded shrink-0">
        <BsCardChecklist className="size-5" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="semibold">
          {data.aktifitas?.judul || '-'}
        </Text>
        <Text size="sm" className="line-clamp-2 lg:line-clamp-1">
          {stripHtmlAndEllipsis(data.aktifitas?.deskripsi ?? '', 200)}
        </Text>
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
    </div>
  )
}
