import PilihAnggotaKelas from '@/components/shared/anggota-kelas/pilih-anggota'
import {
  AnggotaKelasItemType,
  ButtonSubmit,
  Card,
  Shimmer,
  Text,
  Thumbnail,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAnggotaKelasApi } from '@/services/api/shared/anggota-kelas/lihat'
import cn from '@/utils/class-names'
import { wait } from '@/utils/wait'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'

type DetailPesertaCardProps = {
  tipeKelas: 'akademik' | 'umum'
  sudahDinilai: boolean
  isSubmitting: boolean
  className?: string
}

export default function DetailPesertaCard({
  tipeKelas,
  sudahDinilai,
  isSubmitting,
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
      `${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/tugas/${idAktifitas}/nilai/${idPeserta}`,
      { scroll: false }
    )
  }

  if (isLoading) return <CardShimmer className={className} />

  return (
    <>
      <Card
        className={cn(
          'flex flex-col justify-between items-center gap-2 lg:flex-row',
          className
        )}
      >
        <div
          className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer gap-x-2 p-2 lg:w-8/12"
          onClick={() => setShowPilihPeserta(true)}
        >
          <div className="flex items-center gap-x-2">
            <Thumbnail
              src={data?.foto || undefined}
              alt="profil"
              size={48}
              avatar={data?.nama ?? ''}
            />
            <Text
              weight="semibold"
              variant="dark"
              className="text-sm sm:text-base"
            >
              {data?.nama || '-'}
            </Text>
          </div>
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <Text
              weight="semibold"
              color={sudahDinilai ? 'primary' : 'gray'}
              variant={sudahDinilai ? 'default' : 'lighter'}
              className="text-sm sm:text-base"
            >
              {sudahDinilai ? 'Sudah Dinilai' : 'Belum Dinilai'}
            </Text>
            <LuChevronDown size={24} />
          </div>
        </div>
        <div className="flex justify-end flex-1">
          <ButtonSubmit type="submit" isSubmitting={isSubmitting}>
            Simpan Penilaian
          </ButtonSubmit>
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
    <Card
      className={cn(
        'flex flex-col justify-between items-center gap-2 lg:flex-row',
        className
      )}
    >
      <div className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer p-2 lg:w-8/12">
        <div className="flex items-center gap-x-2 w-9/12">
          <Shimmer className="size-12" />
          <Shimmer className="h-3 w-1/3" />
        </div>
        <div className="flex items-center gap-x-4 flex-1">
          <Shimmer className="h-3 flex-1" />
          <Shimmer className="size-3 shrink-0" />
        </div>
      </div>
      <div className="flex justify-end flex-1">
        <Shimmer className="h-10 w-[8.75rem]" />
      </div>
    </Card>
  )
}
