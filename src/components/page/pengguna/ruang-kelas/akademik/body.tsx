'use client'

import { Select, SelectOptionType, Text, Title } from '@/components/ui'
import { deskripsiSemester } from '@/utils/semester'
import { switchCaseObject } from '@/utils/switch-case'
import _ from 'lodash'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import ListKelasCardList from './card-list'
import JadwalAkademik from './jadwal'

const currentYear = new Date().getFullYear()

const semesterOptions: SelectOptionType<string | null>[] = [
  {
    value: null,
    label: 'Semester Aktif',
  },
  ...[...Array(10)].map((_, idx) => {
    const semester = `${currentYear - Math.floor(idx / 2)}${
      (idx % 2) % 2 == 0 ? 2 : 1
    }`

    return {
      value: semester,
      label: deskripsiSemester(semester),
    }
  }),
]

export default function RuangKelasAkademikBody() {
  const [semester, setSemester] = useState<SelectOptionType<string | null>>(
    semesterOptions[0]
  )

  const { jenis: jenisKelas }: { jenis: string } = useParams()

  return (
    <>
      <div className="flex justify-between items-center gap-2 flex-wrap mb-4">
        <div>
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="leading-tight mb-1"
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
        <div>
          <Select
            placeholder="Semester Aktif"
            options={semesterOptions}
            onChange={(item) => {
              if (item) setSemester(item)
            }}
            value={semester}
            className="min-w-48"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-5">
        <JadwalAkademik
          semester={semester.value}
          className="w-full md:w-8/12 lg:w-5/12"
        />
        <ListKelasCardList semester={semester.value} />
      </div>
    </>
  )
}
