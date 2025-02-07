'use client'

import { Button, Text, Title } from '@/components/ui'
import { switchCaseObject } from '@/utils/switch-case'
import _ from 'lodash'
import { useParams } from 'next/navigation'
import ListKelasCardList from './card-list'
import JadwalAkademik from './jadwal'

export default function RuangKelasAkademikBody() {
  const { jenis }: { jenis: string } = useParams()

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
            Semua Kelas {!!jenis ? `yang ${_.startCase(jenis)}` : ''}
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            {switchCaseObject(
              jenis,
              {
                dikelola: 'Semua kelas akademik yang Kamu bisa kelola',
                diikuti: 'Semua kelas akademik yang Kamu ikuti',
              },
              ''
            )}
          </Text>
        </div>
        <Button as="span" size="sm" variant="outline-colorful">
          Semester 2024/2025 Ganjil
        </Button>
      </div>
      <div className="flex flex-wrap items-start gap-5">
        <JadwalAkademik className="w-full md:w-8/12 lg:w-5/12" />
        <ListKelasCardList />
      </div>
    </>
  )
}
