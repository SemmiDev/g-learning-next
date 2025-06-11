'use client'

import { Select, SelectOptionType, Title } from '@/components/ui'
import { deskripsiSemester } from '@/utils/semester'
import { useState } from 'react'
import DaftarKelasCard from './daftar-kelas-card'
import LinimasaSesiSection from './linimasa-sesi-section'

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

export default function AkademikBody() {
  const [semester, setSemester] = useState<SelectOptionType<string | null>>(
    semesterOptions[0]
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 xs:flex-row xs:justify-between xs:items-center">
        <Title as="h4" size="1.5xl" weight="semibold" className="leading-tight">
          Kelas Akademik
        </Title>
        <Select
          placeholder="Semester Aktif"
          options={semesterOptions}
          onChange={(item) => {
            if (item) setSemester(item)
          }}
          value={semester}
          className="min-w-48 flex-1 xs:flex-none"
        />
      </div>
      <div className="grid grid-cols-12 gap-5">
        <LinimasaSesiSection className="col-span-12 md:col-span-7 lg:col-span-5" />
        <DaftarKelasCard className="col-span-12 md:col-span-5 lg:col-span-7" />
      </div>
    </div>
  )
}
