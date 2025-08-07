import { ContentLoader, Text } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Fragment } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import DiskusiCard from './aktifitas-card/diskusi-card'
import InformasiCard from './aktifitas-card/informasi-card'
import KonferensiCard from './aktifitas-card/konferensi-card'
import MateriCard from './aktifitas-card/materi-card'
import SesiCard from './aktifitas-card/sesi-card'
import TugasCard from './aktifitas-card/tugas-card'
import UjianCard from './aktifitas-card/ujian-card'
import PengajarHeaderCard from './pengajar-header-card'
import PesertaHeaderCard from './peserta-header-card'
import CardListShimmer from './shimmer/card-list'

type LinimasaCardListProps = {
  kelas: DataKelasType | undefined
  className?: string
}

export default function LinimasaCardList({
  kelas,
  className,
}: LinimasaCardListProps) {
  const { jwt } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.linimasa.list', idKelas]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listAktifitasApi({
        jwt,
        page,
        idKelas,
        tipe: kelas?.kelas.tipe !== 'Akademik' ? 'aktifitas' : undefined,
        tanpaSesi: true,
        order: 'DESC',
      })

      return {
        list: data?.list ?? [],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const list = data?.pages.flatMap((page) => page.list) ?? []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  if (isLoading)
    return <CardListShimmer peran={kelas?.peran} className={className} />

  return (
    <div className={cn('flex flex-col gap-y-6', className)}>
      {kelas?.peran === 'Pengajar' ? (
        <PengajarHeaderCard />
      ) : (
        <PesertaHeaderCard />
      )}

      <div className="h-0.5"></div>

      <div className="flex flex-col gap-y-6">
        {list.length > 0 ? (
          list.map((item) =>
            !!item.aktifitas ? (
              <Fragment key={item.aktifitas.id}>
                {item.aktifitas.tipe === 'Materi' ? (
                  <MateriCard kelas={kelas} data={item} />
                ) : item.aktifitas.tipe === 'Penugasan' ? (
                  <TugasCard kelas={kelas} data={item} />
                ) : item.aktifitas.tipe === 'Konferensi' ? (
                  <KonferensiCard kelas={kelas} data={item} />
                ) : item.aktifitas.tipe === 'Ujian' ? (
                  <UjianCard kelas={kelas} data={item} />
                ) : item.aktifitas.tipe === 'Pengumuman' ? (
                  <InformasiCard kelas={kelas} data={item} />
                ) : (
                  <DiskusiCard kelas={kelas} data={item} />
                )}
              </Fragment>
            ) : (
              <SesiCard
                key={item.pertemuan_kelas?.id}
                kelas={kelas}
                data={item}
              />
            )
          )
        ) : (
          <div className="flex items-center justify-center h-80">
            <Text size="sm" weight="medium">
              Belum ada aktifitas
            </Text>
          </div>
        )}
      </div>

      {!isLoading && hasNextPage && (
        <ContentLoader ref={refSentry} className="pt-8 pb-4" />
      )}
    </div>
  )
}
