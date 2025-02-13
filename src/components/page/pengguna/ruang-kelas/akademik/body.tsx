'use client'

import { Text, Title } from '@/components/ui'
import { switchCaseObject } from '@/utils/switch-case'
import _ from 'lodash'
import { useParams } from 'next/navigation'
import ListKelasCardList from './card-list'
import JadwalAkademik from './jadwal'

export default function RuangKelasAkademikBody() {
  const { jenis: jenisKelas }: { jenis: string } = useParams()

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="leading-tight mb-3"
          >
            Semua Kelas {!!jenisKelas ? `yang ${_.startCase(jenisKelas)}` : ''}
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            {switchCaseObject(
              jenisKelas,
              {
                dikelola: 'Semua kelas akademik yang Kamu bisa kelola',
                diikuti: 'Semua kelas akademik yang Kamu ikuti',
              },
              ''
            )}
          </Text>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-5">
        <JadwalAkademik className="w-full md:w-8/12 lg:w-5/12" />
        <ListKelasCardList />
      </div>
    </>
  )
}
