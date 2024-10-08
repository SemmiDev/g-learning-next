import { daftarTugasPesertaAction } from '@/actions/pengguna/ruang-kelas/peserta/daftar-tugas'
import { Card, CardSeparator, Loader, Text, Time, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { BsClipboard2Plus } from 'react-icons/bs'

type DaftarTugas = {
  id: string
  judul: string
  batasWaktu: string | null
}

type DaftarTugasCardProps = {
  className?: string
}

export default function DaftarTugasCard({ className }: DaftarTugasCardProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataTugas, isLoading: isLoadingTugas } = useInfiniteQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.daftar-tugas', idKelas],
    queryFn: async ({ pageParam: page }) => {
      const { data } = await daftarTugasPesertaAction({
        page,
        idKelas,
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.id,
          judul: item.judul,
          batasWaktu: item.batas_waktu,
        })) as DaftarTugas[],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const listTugas = dataTugas?.pages.flatMap((page) => page.list) || []

  console.log(listTugas)

  return (
    <>
      <Card className={cn('p-0', className)}>
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Daftar Tugas
        </Title>
        <CardSeparator />
        <div className="flex flex-col space-y-3 max-h-72 overflow-y-auto px-2 py-3">
          {isLoadingTugas ? (
            <Loader size="sm" />
          ) : listTugas.length > 0 ? (
            listTugas.map((item) => (
              <DaftarTugasItem
                key={item.id}
                judul={item.judul}
                batasWaktu={item.batasWaktu}
              />
            ))
          ) : (
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Belum ada tugas
            </Text>
          )}
        </div>
      </Card>
    </>
  )
}

type DaftarTugasItemProps = {
  judul: string
  batasWaktu: string | null
}

function DaftarTugasItem({ judul, batasWaktu }: DaftarTugasItemProps) {
  return (
    <div className="flex space-x-2">
      <div className="flex justify-center items-center size-9 btn-item-violet rounded">
        <BsClipboard2Plus size={17} />
      </div>
      <div className="flex flex-col">
        <Text size="sm" weight="semibold" variant="dark">
          {judul}
        </Text>
        <Text size="2xs" weight="medium" variant="lighter">
          Batas waktu: <Time date={batasWaktu} format="datetime" empty="-" />
        </Text>
      </div>
    </div>
  )
}
