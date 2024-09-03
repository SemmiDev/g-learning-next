'use client'

import { dataProfilAction } from '@/actions/instansi/profil/data'
import { Card, TabGroup, Thumbnail, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { fileSizeToKB, formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { makeSimpleQueryData } from '@/utils/query-data'
import { angka } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import { LuLink, LuPackage, LuSave, LuServer, LuUsers } from 'react-icons/lu'
import HeaderItem from './header-item'

export default function HeaderCard({ className }: { className?: string }) {
  const { data } = useQuery({
    queryKey: ['instansi.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  return (
    <Card className={cn('flex flex-col', className)}>
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <Thumbnail
          src={data?.instansi?.logo}
          size={150}
          alt="logo instansi"
          avatar={data?.instansi?.nama}
          className="shrink-0"
          bordered
          priority
        />
        <div className="space-y-1.5">
          <Title as="h3" size="1.5xl" className="text-center md:text-left">
            {data?.instansi.nama || '-'}
          </Title>
          <div className="flex flex-wrap gap-1.5">
            <HeaderItem
              Icon={LuLink}
              label="Tipe sinkron"
              value={data?.instansi.tipe_sinkron || '-'}
            />
            <HeaderItem
              Icon={LuPackage}
              label="Paket"
              value={data?.paket_instansi.nama || '-'}
            />
            <HeaderItem
              Icon={LuServer}
              label="Total penyimpanan"
              value={`${formatBytes(
                data?.total_penggunaan_penyimpanan ?? 0
              )}/${formatBytes(
                fileSizeToKB(data?.paket_instansi?.batas_penyimpanan ?? 0, 'MB')
              )}`}
            />
            <HeaderItem
              Icon={LuUsers}
              label="Jumlah user"
              value={`${angka(data?.total_pengguna ?? 0)}/${angka(
                data?.paket_instansi?.batas_pengguna ?? 0
              )}`}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <HeaderItem
              Icon={LuSave}
              label="Penyimpanan/pengajar"
              value={`${formatBytes(
                fileSizeToKB(
                  data?.paket_instansi?.batas_penyimpanan_pengajar ?? 0,
                  'MB'
                )
              )}/pengajar`}
            />
            <HeaderItem
              Icon={LuSave}
              label="Penyimpanan/peserta"
              value={`${formatBytes(
                fileSizeToKB(
                  data?.paket_instansi?.batas_penyimpanan_peserta ?? 0,
                  'MB'
                )
              )}/peserta`}
            />
            <HeaderItem
              Icon={LuPackage}
              label="Total kelas"
              value={angka(data?.total_kelas ?? 0)}
            />
            <HeaderItem
              Icon={LuServer}
              label="Kelas/pengajar"
              value={angka(data?.paket_instansi?.batas_kelas_pengajar ?? 0)}
            />
          </div>
        </div>
      </div>
      <TabGroup
        className="mt-4 mb-2"
        path={routes.instansi.profile}
        items={[
          {
            text: 'Detail',
            slugAlias: 'detail',
          },
          {
            text: 'Pengguna',
            slug: 'pengguna',
          },
          {
            text: 'Riwayat Pembayaran',
            slug: 'riwayat-pembayaran',
          },
          {
            text: 'Sinkron',
            slug: 'sinkron',
          },
        ]}
      />
    </Card>
  )
}
