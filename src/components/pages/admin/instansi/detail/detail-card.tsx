import {
  ActionIcon,
  ActionIconTooltip,
  Card,
  Thumbnail,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { lihatInstansiApi } from '@/services/api/admin/instansi/lihat'
import { fileSizeToKB, formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { deskripsiSemester } from '@/utils/semester'
import { angka } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsGear } from 'react-icons/bs'
import {
  LuCamera,
  LuLink,
  LuPackage,
  LuRibbon,
  LuSave,
  LuServer,
  LuUsers,
} from 'react-icons/lu'
import UbahModal from '../modal/ubah'
import DetailItem from './detail-item'
import UbahLogoModal from './modal/ubah-logo'

export default function DetailCard({ className }: { className?: string }) {
  const { makeSimpleApiQueryData } = useSessionJwt()
  const [ubahLogo, setUbahLogo] = useState(false)
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()

  const { id }: { id: string } = useParams()

  const { data } = useQuery({
    queryKey: ['admin.instansi.detail', id],
    queryFn: makeSimpleApiQueryData(lihatInstansiApi, id),
  })

  return (
    <>
      <Card className={cn('flex justify-between gap-x-2 relative', className)}>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div className="inline-block relative">
            <ActionIconTooltip
              tooltip="Ganti Logo"
              size="sm"
              variant="flat"
              color="secondary"
              className="absolute top-1.5 right-1.5"
              onClick={() => setUbahLogo(true)}
            >
              <LuCamera />
            </ActionIconTooltip>
            <Thumbnail
              src={data?.instansi?.logo}
              size={150}
              alt="logo instansi"
              avatar={data?.instansi?.nama}
              className="shrink-0"
              bordered
              priority
            />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Title as="h3" size="1.5xl" className="text-center md:text-left">
              {data?.instansi?.nama}
            </Title>
            <div className="flex flex-wrap gap-1.5">
              <DetailItem
                Icon={LuRibbon}
                label="Semester Aktif"
                value={deskripsiSemester(data?.instansi?.semester_aktif || '-')}
              />
              <DetailItem
                Icon={LuLink}
                label="Tipe sinkron"
                value={data?.instansi?.tipe_sinkron || '-'}
              />
              <DetailItem
                Icon={LuPackage}
                label="Paket"
                value={data?.paket_instansi?.nama || '-'}
              />
              <DetailItem
                Icon={LuServer}
                label="Total penyimpanan"
                value={`${formatBytes(
                  data?.jumlah_penyimpanan_terpakai ?? 0
                )}/${formatBytes(
                  fileSizeToKB(
                    data?.paket_instansi?.batas_penyimpanan ?? 0,
                    'MB'
                  )
                )}`}
              />
              <DetailItem
                Icon={LuUsers}
                label="Jumlah user"
                value={`${angka(data?.jumlah_pengguna ?? 0)}/${angka(
                  data?.paket_instansi?.batas_pengguna ?? 0
                )}`}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <DetailItem
                Icon={LuSave}
                label="Penyimpanan/pengajar"
                value={`${formatBytes(
                  fileSizeToKB(
                    data?.paket_instansi?.batas_penyimpanan_pengajar ?? 0,
                    'MB'
                  )
                )}/pengajar`}
              />
              <DetailItem
                Icon={LuSave}
                label="Penyimpanan/peserta"
                value={`${formatBytes(
                  fileSizeToKB(
                    data?.paket_instansi?.batas_penyimpanan_peserta ?? 0,
                    'MB'
                  )
                )}/peserta`}
              />
              <DetailItem
                Icon={LuPackage}
                label="Total kelas"
                value={angka(data?.jumlah_kelas ?? 0)}
              />
              <DetailItem
                Icon={LuServer}
                label="Kelas/pengajar"
                value={angka(data?.paket_instansi?.batas_kelas_pengajar ?? 0)}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <ActionIcon
            size="sm"
            variant="outline"
            onClick={() => doShowUbah(id)}
          >
            <BsGear />
          </ActionIcon>
        </div>
      </Card>

      <UbahLogoModal show={ubahLogo} setShow={setUbahLogo} />

      <UbahModal show={showUbah} id={keyUbah} onHide={doHideUbah} />
    </>
  )
}
