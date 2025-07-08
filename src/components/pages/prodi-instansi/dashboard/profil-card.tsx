import { Card, Text, Thumbnail, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/prodi-instansi/profil-instansi/detail/data'
import { processData } from '@/utils/process-data'
import { angka, rupiah } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import { LuCalendar, LuCreditCard, LuPackage } from 'react-icons/lu'
import BackgroundProfil from '../../instansi/dashboard/background-pattern'
import ProfilItem from './profil-item'

export default function DashboardProfilCard() {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { data } = useQuery({
    queryKey: ['prodi-instansi.profil-instansi'],
    queryFn: makeSimpleApiQueryData(dataProfilApi),
  })

  return (
    <Card className="flex flex-col p-0">
      <div className="relative">
        <BackgroundProfil
          persistentKey={`${data?.instansi?.nama}${new Date()
            .toJSON()
            .slice(0, 10)}`}
          className="absolute w-full h-36"
        />
        <div className="relative flex flex-col items-center pt-4 pb-4 m-auto">
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
          <Title size="1.5xl" className="text-center">
            {data?.instansi.nama}
          </Title>
          <Text weight="semibold" variant="dark" className="text-center">
            Program Studi {data?.sms.nm_lemb || '-'}
          </Text>
          <Text
            size="xs"
            weight="medium"
            variant="lighter"
            className="me-1 mt-1.5"
          >
            Tipe sinkron: {data?.instansi.tipe_sinkron || '-'}
          </Text>
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
