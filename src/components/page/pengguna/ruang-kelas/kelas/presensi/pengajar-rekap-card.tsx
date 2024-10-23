import { DataType as DataSesiType } from '@/actions/pengguna/ruang-kelas/presensi/pengajar/table-sesi-absensi'
import { Card, Title } from '@/components/ui'
import { useState } from 'react'
import PengajarRekapPresensiDetailSesiSection from './pengajar-rekap-detail-sesi-section'
import PengajarRekapPresensiListSesiSection from './pengajar-rekap-list-sesi-section'

type PengajarRekapPresensiCardProps = {
  className?: string
}

export default function PengajarRekapPresensiCard({
  className,
}: PengajarRekapPresensiCardProps) {
  const [sesiAktif, setSesiAktif] = useState<DataSesiType>()

  return (
    <Card className={className}>
      <Title as="h4" size="1.5xl" weight="semibold">
        Rekap Presensi Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <PengajarRekapPresensiListSesiSection
          sesiAktif={sesiAktif}
          onSelectSesi={(sesi) => setSesiAktif(sesi)}
          className="w-full lg:w-5/12"
        />
        {sesiAktif && (
          <PengajarRekapPresensiDetailSesiSection
            sesiAktif={sesiAktif}
            className="w-full lg:w-7/12"
          />
        )}
      </div>
    </Card>
  )
}
