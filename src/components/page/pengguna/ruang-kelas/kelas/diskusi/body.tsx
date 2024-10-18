'use client'

import { listAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { Loader, Text } from '@/components/ui'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Fragment } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import DaftarTugasCard from './daftar-tugas-card'
import DiskusiCard from './diskusi-card'
import InformasiCard from './informasi-card'
import KonferensiCard from './konferensi-card'
import MateriCard from './materi-card'
import PengajarHeaderCard from './pengajar-header-card'
import PesertaHeaderCard from './peserta-header-card'
import PresensiCard from './presensi-card'
import BodyShimmer from './shimmer/body-shimmer'
import TugasCard from './tugas-card'
import UjianCard from './ujian-card'

export default function DiskusiBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.diskusi.list', idKelas]

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listAktifitasAction({
        page,
        idKelas,
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

  if (isLoading) return <BodyShimmer />

  if (!dataKelas) return null

  return (
    <div className="flex flex-col-reverse gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col lg:w-7/12">
        {dataKelas?.peran === 'Pengajar' ? (
          <PengajarHeaderCard />
        ) : (
          <PesertaHeaderCard />
        )}

        {list.length > 0 ? (
          <div>
            {list.map((item) => (
              <Fragment key={item.aktifitas.id}>
                {item.aktifitas.tipe === 'Materi' ? (
                  <MateriCard kelas={dataKelas} data={item} className="mt-6" />
                ) : item.aktifitas.tipe === 'Penugasan' ? (
                  <TugasCard kelas={dataKelas} data={item} className="mt-6" />
                ) : item.aktifitas.tipe === 'Konferensi' ? (
                  <KonferensiCard
                    kelas={dataKelas}
                    data={item}
                    className="mt-6"
                  />
                ) : item.aktifitas.tipe === 'Ujian' ? (
                  <UjianCard kelas={dataKelas} data={item} className="mt-6" />
                ) : item.aktifitas.tipe === 'Pengumuman' ? (
                  <InformasiCard
                    kelas={dataKelas}
                    data={item}
                    className="mt-6"
                  />
                ) : (
                  <DiskusiCard kelas={dataKelas} data={item} className="mt-6" />
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-80">
            <Text size="sm" weight="medium">
              Belum ada aktifitas
            </Text>
          </div>
        )}

        {!isLoading && hasNextPage && (
          <Loader ref={refSentry} className="pt-8 pb-4" />
        )}
      </div>

      {dataKelas?.peran === 'Peserta' && (
        <div className="flex flex-col flex-1">
          <PresensiCard />
          <DaftarTugasCard className="mt-6" />
        </div>
      )}
    </div>
  )
}
