import { ActionIcon, Card, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import logo from '@public/images/instansi-logo.png'
import Image from 'next/image'
import { BsGear } from 'react-icons/bs'
import { LuLink, LuPackage, LuSave, LuServer, LuUsers } from 'react-icons/lu'
import DetailItem from './detail-item'

export default function DetailCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex justify-between space-x-2', className)}>
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <figure className="shrink-0 size-[150px] border border-muted rounded p-6">
          <Image src={logo} alt="logo instansi" className="object-contain" />
        </figure>
        <div className="space-y-1.5">
          <Title as="h3" size="1.5xl" className="text-center md:text-left">
            UIN SUSKA RIAU
          </Title>
          <div className="flex flex-wrap gap-1.5">
            <DetailItem Icon={LuLink} label="Tipe sinkron" value="Misca" />
            <DetailItem Icon={LuPackage} label="Paket" value="Premium" />
            <DetailItem
              Icon={LuServer}
              label="Total penyimpanan"
              value="60TB/100TB"
            />
            <DetailItem
              Icon={LuUsers}
              label="Jumlah user"
              value="3.500/5.000"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <DetailItem
              Icon={LuSave}
              label="Penyimpanan/pengajar"
              value="1.000MB/pengajar"
            />
            <DetailItem
              Icon={LuSave}
              label="Penyimpanan/siswa"
              value="100MB/siswa"
            />
            <DetailItem Icon={LuPackage} label="Total kelas" value="500" />
            <DetailItem Icon={LuServer} label="Kelas/pengajar" value="50" />
          </div>
        </div>
      </div>
      <div>
        <ActionIcon size="sm" variant="outline">
          <BsGear />
        </ActionIcon>
      </div>
    </Card>
  )
}
