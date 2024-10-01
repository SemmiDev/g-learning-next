'use client'

import { loadMoreAction } from '@/actions/pengajar/ruang-kelas/kelas'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import useInfiniteScroll, {
  ScrollDirection,
} from 'react-easy-infinite-scroll-hook'
import ConferenceCard from './diskusi/conference-card'
import InformasiCard from './diskusi/informasi-card'
import MateriCard from './diskusi/materi-card'
import PengajarHeaderCard from './diskusi/pengajar-header-card'
import PesertaHeaderCard from './diskusi/peserta-header-card'
import TugasCard from './diskusi/tugas-card'
import UjianCard from './diskusi/ujian-card'
import { listAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/list'
import DiskusiCard from './diskusi/diskusi-card'
import { Loader, Text } from '@/components/ui'

const queryKey = ['pengguna.ruang-kelas.diskusi.list']

export default function DiskusiBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: async () => {
      const { data } = await lihatKelasAction(idKelas)
      return data
    },
  })

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listAktifitasAction({
          page,
          params: { idKelas },
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

  const loadNext = async (direction: ScrollDirection) => {
    if (direction === 'down' && hasNextPage) {
      await fetchNextPage()
    }
  }

  const ref = useInfiniteScroll({
    next: loadNext,
    windowScroll: true,
    rowCount: list.length,
    hasMore: { down: hasNextPage },
  })

  return (
    <div className="flex flex-col lg:w-7/12">
      {dataKelas?.peran === 'Pengajar' ? (
        <PengajarHeaderCard className="mt-8" />
      ) : (
        <PesertaHeaderCard className="mt-8" />
      )}

      {isLoading || (!list.length && isFetching) ? (
        <Loader height={300} />
      ) : list.length > 0 ? (
        <div ref={ref as any}>
          {list.map((item) => (
            <Fragment key={item.aktifitas.id}>
              {item.aktifitas.tipe === 'Materi' ? (
                <MateriCard className="mt-6" data={item} />
              ) : item.aktifitas.tipe === 'Penugasan' ? (
                <TugasCard className="mt-6" />
              ) : item.aktifitas.tipe === 'Konferensi' ? (
                <ConferenceCard className="mt-6" />
              ) : item.aktifitas.tipe === 'Ujian' ? (
                <UjianCard className="mt-6" />
              ) : item.aktifitas.tipe === 'Pengumuman' ? (
                <InformasiCard className="mt-6" />
              ) : (
                <DiskusiCard />
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-72">
          <Text size="sm" weight="medium">
            Belum ada aktifitas
          </Text>
        </div>
      )}
    </div>
  )
}
