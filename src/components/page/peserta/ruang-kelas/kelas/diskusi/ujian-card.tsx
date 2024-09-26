import { Button, Card, CardSeparator, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import { BsCardChecklist } from 'react-icons/bs'
import KomentarSectionZero from './komentar-section-zero'

export default function UjianCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col px-0 py-0', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex space-x-3">
          <Image src={imagePhoto} alt="foto" className="size-12 rounded-lg" />
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              Prabroro Janggar
            </Text>
            <Text size="xs" weight="medium" variant="lighter">
              30 Menit
            </Text>
          </div>
        </div>
      </div>
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
          Judul Ujian
        </Title>
        <Text size="sm" variant="dark" className="truncate">
          Ini merupakan catatan dari sebuah diskui yang telah dibuat, cukup di
          buat dalam 2 kalimat dan tambahkan.
        </Text>

        <div className="flex items-center space-x-2 bg-gray-50/40 border border-dashed border-gray-100 rounded-md p-2 mt-2">
          <figure className="flex justify-center items-center size-[52px] rounded btn-item-blue">
            <BsCardChecklist size={24} />
          </figure>
          <div className="flex flex-col gap-2 2xl:flex-row">
            <table>
              <tbody>
                <tr>
                  <td className="text-xs text-gray-lighter font-medium w-40 2xl:w-28">
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
                  <td className="text-xs text-gray-lighter font-medium w-40 2xl:w-36">
                    Batas waktu pengerjaan
                  </td>
                  <td className="text-xs text-gray-dark font-semibold text-center w-2">
                    :
                  </td>
                  <td className="text-xs text-gray-dark font-semibold">
                    20 Desember 2023, 23:59
                  </td>
                </tr>
                <tr>
                  <td className="text-xs text-gray-lighter font-medium">
                    Jenis ujian
                  </td>
                  <td className="text-xs text-gray-dark font-semibold text-center">
                    :
                  </td>
                  <td className="text-xs text-gray-dark font-semibold">UTS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link href={`${routes.peserta.kelas}/diskusi/detail/ujian`}>
          <Button size="sm" className="w-full">
            Kerjakan Ujian
          </Button>
        </Link>
        <KomentarSectionZero className="pt-4 px-2 pb-2" />
      </div>
    </Card>
  )
}
