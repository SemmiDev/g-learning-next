import { Text, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsCardChecklist, BsWebcam } from 'react-icons/bs'

type UjianItemProps = {
  className?: string
}

export default function UjianItem({ className }: UjianItemProps) {
  return (
    <div className={cn('flex gap-x-2 px-2 py-4', className)}>
      <div className="flex justify-center items-center size-[2.625rem] btn-item-blue rounded shrink-0">
        <BsCardChecklist className="size-5" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="semibold">
          Judul Ujian
        </Text>
        <Text size="sm" className="line-clamp-2 lg:line-clamp-1">
          Ini merupakan catatan dari sebuah Tugas yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan selengkapnya. Ini merupakan catatan
          dari sebuah diskui yang telah
        </Text>
        <div className="flex flex-col gap-x-2 2xl:flex-row">
          <table>
            <tbody>
              <tr>
                <td className="text-xs text-gray-lighter font-medium w-28 sm:w-40 2xl:w-28">
                  Jumlah Soal
                </td>
                <td className="text-xs text-gray-dark font-semibold text-center w-2">
                  :
                </td>
                <td className="text-xs text-gray-dark font-semibold">20</td>
              </tr>
              <tr>
                <td className="text-xs text-gray-lighter font-medium">
                  Durasi pengerjaan
                </td>
                <td className="text-xs text-gray-dark font-semibold text-center">
                  :
                </td>
                <td className="text-xs text-gray-dark font-semibold">
                  90 menit
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td className="text-xs text-gray-lighter font-medium w-28 sm:w-40 2xl:w-36">
                  Batas waktu pengerjaan
                </td>
                <td className="text-xs text-gray-dark font-semibold text-center w-2">
                  :
                </td>
                <td className="text-xs text-gray-dark font-semibold">
                  <Time
                    date="2025-03-10 17:00:00"
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
                <td className="text-xs text-gray-dark font-semibold">Kuis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
