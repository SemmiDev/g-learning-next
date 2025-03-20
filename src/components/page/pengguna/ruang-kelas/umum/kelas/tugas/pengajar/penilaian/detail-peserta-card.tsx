import { lihatPesertaKelasAction } from '@/actions/shared/peserta-kelas/lihat'
import PilihPesertaKelas from '@/components/shared/peserta-kelas/pilih-peserta'
import { ButtonSubmit, Card, Shimmer, Text, Thumbnail } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { wait } from '@/utils/wait'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
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
  const router = useRouter()
  const [showPilihPeserta, setShowPilihPeserta] = useState(false)

  const {
    kelas: idKelas,
    id: idAktifitas,
    peserta: idPeserta,
  }: { kelas: string; id: string; peserta: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.peserta.detail', idPeserta],
    queryFn: makeSimpleQueryDataWithParams(
      lihatPesertaKelasAction,
      idKelas,
      idPeserta
    ),
  })

  const handlePilihPeserta = async (idPeserta: string) => {
    // wait for modal to close
    await wait(300)

    router.replace(
      `${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/tugas/${idAktifitas}/nilai/${idPeserta}`,
      { scroll: false }
    )
  }

  if (isLoading) return <ShimmerCard className={className} />

  return (
    <>
      <Card
        className={cn(
          'flex flex-col justify-between items-center gap-2 lg:flex-row',
          className
        )}
      >
        <div
          className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer p-2 lg:w-8/12"
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
              color={sudahDinilai ? 'primary' : 'gray'}
              variant={sudahDinilai ? 'default' : 'lighter'}
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

      <PilihPesertaKelas
        idKelas={idKelas}
        show={showPilihPeserta}
        setShow={setShowPilihPeserta}
        onSelect={(val) => handlePilihPeserta(val.id)}
      />
    </>
  )
}

function ShimmerCard({ className }: { className?: string }) {
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
