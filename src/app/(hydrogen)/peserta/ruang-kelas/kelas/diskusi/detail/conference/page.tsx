'use client'

import KomentarSectionShort from '@/components/page/peserta/ruang-kelas/kelas/diskusi/komentar-section-short'
import { Button, Card, CardSeparator, ReadMore, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import Link from 'next/link'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function DiskusiDetailConferencePage() {
  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.peserta.kelas}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start gap-y-8 lg:gap-x-4 lg:gap-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-7/12">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text size="lg" weight="semibold" variant="dark" className="mb-2">
                Judul Conference
              </Text>
              <Text size="sm">
                <ReadMore>
                  Ini merupakan catatan dari sebuah tugas yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMore>
              </Text>
            </div>
          </div>
          <CardSeparator />
          <div className="flex p-2">
            <Button size="sm" color="primary" className="w-full">
              Gabung Conference
            </Button>
          </div>
          <KomentarSectionShort className="p-4" />
        </Card>
      </div>
    </>
  )
}
