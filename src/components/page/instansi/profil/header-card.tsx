import { Card, TabGroup, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import logo from '@public/images/instansi-logo.png'
import Image from 'next/image'
import { LuLink, LuPackage, LuSave, LuServer, LuUsers } from 'react-icons/lu'
import HeaderItem from './header-item'

export default function HeaderCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <figure className="shrink-0 size-[150px] border border-muted rounded">
          <Image
            src={logo}
            alt="logo instansi"
            className="object-contain w-full h-full"
            priority
          />
        </figure>
        <div className="space-y-1.5">
          <Title as="h3" size="1.5xl" className="text-center md:text-left">
            UIN SUSKA RIAU
          </Title>
          <div className="flex flex-wrap gap-1.5">
            <HeaderItem Icon={LuLink} label="Tipe sinkron" value="Misca" />
            <HeaderItem Icon={LuPackage} label="Paket" value="Premium" />
            <HeaderItem
              Icon={LuServer}
              label="Total penyimpanan"
              value="60TB/100TB"
            />
            <HeaderItem
              Icon={LuUsers}
              label="Jumlah user"
              value="3.500/5.000"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <HeaderItem
              Icon={LuSave}
              label="Penyimpanan/pengajar"
              value="1.000MB/pengajar"
            />
            <HeaderItem
              Icon={LuSave}
              label="Penyimpanan/peserta"
              value="100MB/peserta"
            />
            <HeaderItem Icon={LuPackage} label="Total kelas" value="500" />
            <HeaderItem Icon={LuServer} label="Kelas/pengajar" value="50" />
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
