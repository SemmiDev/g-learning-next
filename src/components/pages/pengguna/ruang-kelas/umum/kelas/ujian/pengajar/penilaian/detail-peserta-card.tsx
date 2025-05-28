import PilihAnggotaKelas from '@/components/shared/anggota-kelas/pilih-anggota'
import {
  AnggotaKelasItemType,
  Card,
  Shimmer,
  Text,
  Thumbnail,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAnggotaKelasApi } from '@/services/api/shared/anggota-kelas/lihat'
import { wait } from '@/utils/wait'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BiLoader } from 'react-icons/bi'
import { LuChevronDown } from 'react-icons/lu'

type DetailPesertaCardProps = {
  tipeKelas: 'akademik' | 'umum'
  isWaiting: boolean
  sudahUjian: boolean
  sudahDinilai: boolean
  className?: string
}

export default function DetailPesertaCard({
  tipeKelas,
  isWaiting,
  sudahUjian,
  sudahDinilai,
  className,
}: DetailPesertaCardProps) {
  const { makeSimpleApiQueryData } = useSessionJwt()
  const router = useRouter()

  const [showPilihPeserta, setShowPilihPeserta] = useState(false)

  const {
    kelas: idKelas,
    id: idAktifitas,
    peserta: idPeserta,
  }: { kelas: string; id: string; peserta: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.peserta.detail', idPeserta],
    queryFn: makeSimpleApiQueryData(lihatAnggotaKelasApi, idKelas, idPeserta),
  })

  const selectedAnggota = data
    ? ({
        id: data?.id_peserta,
        nama: data?.nama,
        email: data?.email,
        foto: data?.foto,
        peran: 'Peserta',
      } as AnggotaKelasItemType)
    : undefined

  const handlePilihPeserta = async (idPeserta: string) => {
    // wait for modal to close
    await wait(300)

    router.replace(
      `${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/ujian/${idAktifitas}/nilai/${idPeserta}`,
      { scroll: false }
    )
  }

  if (isLoading) return <CardShimmer className={className} />

  return (
    <>
      <Card className={className}>
        <div
          className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer p-2 lg:w-6/12"
          onClick={() => setShowPilihPeserta(true)}
        >
          <div className="flex items-center gap-x-2">
            <Thumbnail
              src={data?.foto || undefined}
              alt="profil"
              size={48}
              avatar={data?.nama ?? ''}
            />
            <Text weight="semibold" variant="dark">
              {data?.nama || '-'}
            </Text>
          </div>
          <div className="flex items-center gap-x-4">
            <Text
              weight="semibold"
              color={
                isWaiting
                  ? 'gray'
                  : sudahUjian
                  ? sudahDinilai
                    ? 'success'
                    : 'gray'
                  : 'danger'
              }
              variant={sudahDinilai || !sudahUjian ? 'default' : 'lighter'}
            >
              {isWaiting ? (
                <BiLoader className="animate-spin" />
              ) : sudahUjian ? (
                sudahDinilai ? (
                  'Sudah Dinilai'
                ) : (
                  'Belum Dinilai'
                )
              ) : (
                'Belum Ujian'
              )}
            </Text>
            <LuChevronDown size={24} />
          </div>
        </div>
      </Card>

      <PilihAnggotaKelas
        idKelas={idKelas}
        show={showPilihPeserta}
        setShow={setShowPilihPeserta}
        onSelect={(val) => handlePilihPeserta(val.id)}
        defaultValue={selectedAnggota}
        peran="Peserta"
      />
    </>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <div className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer p-2 lg:w-6/12">
        <div className="flex items-center gap-x-2 w-9/12">
          <Shimmer className="size-12" />
          <Shimmer className="h-3 w-1/3" />
        </div>
        <div className="flex items-center gap-x-4 flex-1">
          <Shimmer className="h-3 flex-1" />
          <Shimmer className="size-3 shrink-0" />
        </div>
      </div>
    </Card>
  )
}
