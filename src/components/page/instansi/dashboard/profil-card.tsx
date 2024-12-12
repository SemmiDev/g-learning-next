import { dataProfilAction } from '@/actions/instansi/profil/detail/data'
import { ActionIcon, Card, Text, Thumbnail, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { processData } from '@/utils/process-data'
import { makeSimpleQueryData } from '@/utils/query-data'
import { angka, rupiah } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { BsGear } from 'react-icons/bs'
import { LuCalendar, LuCreditCard, LuPackage } from 'react-icons/lu'
import BackgroundProfil from './background-pattern'
import ProfilItem from './profil-item'

export default function DashboardProfilCard() {
  const { data } = useQuery({
    queryKey: ['instansi.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  return (
    <Card className="flex flex-col p-0">
      <div className="relative h-[250px]">
        <BackgroundProfil
          persistentKey={`${data?.instansi?.nama}${new Date()
            .toJSON()
            .slice(0, 10)}`}
          className="absolute w-full h-[150px]"
        />
        <div className="absolute flex flex-col items-center pt-4 pb-4 m-auto left-0 right-0">
          <Thumbnail
            src={data?.instansi?.logo}
            size={150}
            alt="logo instansi"
            avatar={data?.instansi?.nama}
            className="shrink-0 bg-white shadow-sm mb-2"
            rounded="md"
            bordered
            priority
          />
          <Title size="1.5xl">{data?.instansi.nama}</Title>
          <div className="flex items-center">
            <Text size="xs" weight="medium" variant="lighter" className="me-1">
              Tipe sinkron: {data?.instansi.tipe_sinkron || '-'}
            </Text>
            <Link href={`${routes.instansi.profileSinkron}`}>
              <ActionIcon size="sm" variant="outline" color="warning">
                <BsGear size={12} />
              </ActionIcon>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-2 sm:flex-row">
        <ProfilItem
          Icon={LuPackage}
          label={'Jenis Paket yang digunakan'}
          value={data?.paket_instansi?.nama || '-'}
          variant="solid"
          color="blue"
          className="sm:w-1/3"
        />
        <ProfilItem
          Icon={LuCalendar}
          label={'Tanggal Pembayaran Selanjutnya'}
          /* TODO: Tanggal pembayaran selanjutnya jika API sudah ada */
          value="-"
          variant="solid"
          color="green"
          className="sm:w-1/3"
        />
        <ProfilItem
          Icon={LuCreditCard}
          label={'Biaya Paket'}
          value={
            data?.paket_instansi?.harga
              ? rupiah(data?.paket_instansi?.harga)
              : '-'
          }
          variant="solid"
          color="red"
          className="sm:w-1/3"
        />
      </div>
      <div className="flex flex-col gap-3 p-2 sm:flex-row">
        <ProfilItem
          Icon={LuPackage}
          label={'Limit Pengguna'}
          value={processData(
            data?.paket_instansi?.batas_pengguna,
            (val) => angka(val),
            '-'
          )}
          variant="outline"
          color="blue"
          className="sm:w-1/3"
        />
        <ProfilItem
          Icon={LuCalendar}
          label={'Limit Pembukaan Kelas'}
          value={processData(
            data?.paket_instansi?.batas_kelas,
            (val) => angka(val),
            '-'
          )}
          variant="outline"
          color="green"
          className="sm:w-1/3"
        />
        <ProfilItem
          Icon={LuCreditCard}
          label={'Limit Kelas Tiap Pengajar'}
          value={processData(
            data?.paket_instansi?.batas_kelas_pengajar,
            (val) => angka(val),
            '-'
          )}
          variant="outline"
          color="red"
          className="sm:w-1/3"
        />
      </div>
    </Card>
  )
}
