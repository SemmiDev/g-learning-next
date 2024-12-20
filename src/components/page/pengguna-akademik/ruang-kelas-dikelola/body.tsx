'use client'

import { Button, Text, Title } from '@/components/ui'
import imageKelas from '@public/images/list-kelas.png'
import JadwalAkademik from './jadwal'
import KelasCard from './kelas-card'

export default function RuangKelasAkademikDikelolaBody() {
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
            Semua Kelas Akademik yang Dikelola
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            Semua kelas akademik yang Kamu bisa kelola
          </Text>
        </div>
        <Button as="span" size="sm" variant="outline-colorful">
          Semester 2024/2025 Ganjil
        </Button>
      </div>
      <div className="flex flex-wrap items-start gap-5">
        <JadwalAkademik className="w-full md:w-8/12 lg:w-5/12" />
        <div className="grid grid-cols-1 gap-5 flex-1 lg:grid-cols-2 xl:grid-cols-2">
          {[...Array(10)].map((e, i) => {
            return (
              <KelasCard
                program={i == 0 ? 'Aljabar Linear' : `Sistem Operasi ${i}`}
                kelas="Kelas TI A"
                image={i == 0 ? imageKelas : undefined}
                instansi="UIN ASUTRA Singapore"
                instansiCentang={true}
                pengajar="Annitsa Bestwedden"
                key={i}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
