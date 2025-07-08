'use client'

import { Card, Select, SelectOptionType, Text, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/prodi-instansi/profil-instansi/detail/data'
import { deskripsiSemester } from '@/utils/semester'
import { useQuery } from '@tanstack/react-query'
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
  const { makeSimpleApiQueryData } = useSessionJwt()

  const [semester, setSemester] = useState<SelectOptionType<string | null>>(
    semesterOptions[0]
  )

  const { data } = useQuery({
    queryKey: ['prodi-instansi.profil-instansi'],
    queryFn: makeSimpleApiQueryData(dataProfilApi),
  })

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-2 p-5">
        <Title size="1.5xl">{data?.instansi.nama}</Title>
        <Text weight="semibold" variant="dark">
          Program Studi {data?.sms.nm_lemb || '-'}
        </Text>
      </Card>
      <div className="flex justify-between gap-x-4 gap-y-2 flex-wrap">
        <Title
          as="h4"
          size="1.5xl"
          weight="semibold"
          className="leading-tight shrink-0"
        >
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
      <div className="grid grid-cols-12 gap-x-5 gap-y-12">
        <LinimasaSesiSection
          semester={semester.value || undefined}
          className="col-span-12 md:col-span-7 lg:col-span-5"
        />
        <DaftarKelasCard
          semester={semester.value || undefined}
          className="col-span-12 md:col-span-5 lg:col-span-7"
        />
      </div>
    </div>
  )
}
