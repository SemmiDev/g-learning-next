'use client'

import { listBerkasKelasAction } from '@/actions/pengguna/ruang-kelas/berkas/list'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  FilePreviewType,
  Input,
  Loader,
  ModalFilePreview,
  Shimmer,
  Text,
} from '@/components/ui'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { Dropdown } from 'rizzui'
import BerkasCard, { BerkasType } from './berkas-card'

type SortDataType = {
  title: string
  sort: {
    name: string
    order: 'asc' | 'desc'
  }
}

const sortData: SortDataType[] = [
  {
    title: 'Terbaru',
    sort: {
      name: 'created_at_file_aktifitas',
      order: 'desc',
    },
  },
  {
    title: 'Terlawas',
    sort: {
      name: 'created_at_file_aktifitas',
      order: 'asc',
    },
  },
]

export default function BerkasBody() {
  const [sort, setSort] = useState<SortDataType['sort']>(sortData[0].sort)
  const [search, setSearch] = useState('')
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const queryKey = ['pengguna.ruang-kelas.berkas', idKelas]

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listBerkasKelasAction({
          page,
          search,
          sort,
          idKelas,
        })

        return {
          list: (data?.list ?? []).map((item) => ({
            id: item.id,
            name: item.nama,
            time: item.created_at_file_aktifitas,
            link: item.url,
            extension: item.ekstensi,
            folder: false,
            size: getFileSize(item),
            type: getFileType(item),
            driveId: item.id_instansi ?? undefined,
            idAktifitas: item.id_aktifitas,
            idPertemuan: item.id_pertemuan,
            aktifitas: item.judul_aktifitas,
            tipeAktifitas:
              item.tipe_aktifitas === 'Materi'
                ? 'materi'
                : item.tipe_aktifitas === 'Penugasan'
                ? 'tugas'
                : item.tipe_aktifitas === 'Ujian'
                ? 'ujian'
                : item.tipe_aktifitas === 'Konferensi'
                ? 'konferensi'
                : item.tipe_aktifitas === 'Pengumuman'
                ? 'informasi'
                : 'lainnya',
          })) as BerkasType[],
          pagination: data?.pagination,
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.pagination?.hasNextPage
          ? (lastPage.pagination?.page ?? 1) + 1
          : undefined,
    })

  const files = data?.pages.flatMap((page) => page.list) || []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  useEffect(() => {
    refetch()
  }, [sort, refetch])

  useDebounce(() => refetch(), search ? 250 : 0, [refetch, search])

  const sorting = sortData.find(
    (item) => item.sort.name === sort?.name && item.sort.order === sort?.order
  )

  if (!dataKelas) return null

  return (
    <>
      <div className="flex gap-x-2 mt-8">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Berkas Bahan Ajar"
          className="w-72 sm:w-96"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          clearable
          onClear={() => setSearch('')}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <Button as="span" size="sm" variant="outline" className="bg-white">
              {sorting && (
                <>
                  {sorting?.title} <BsChevronDown className="ml-2 w-5" />
                </>
              )}
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {sortData.map((item) => (
              <Dropdown.Item
                key={item.title}
                className="justify-between"
                onClick={() =>
                  setSort({
                    name: item.sort.name,
                    order: item.sort.order,
                  })
                }
              >
                <Text size="sm" className="text-left">
                  {item.title}
                </Text>{' '}
                {sort?.name === item.sort.name &&
                  sort?.order === item.sort.order && <BsCheck size={18} />}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {isLoading ? (
        <ListItemShimmer />
      ) : (
        <div className="relative mt-4">
          {isFetching && (
            <div className="flex justify-center items-center absolute m-auto left-0 right-0 top-0 bottom-0 bg-white/50 rounded-lg z-10">
              <div className="size-10 rounded-full bg-transparent">
                <CgSpinner className="size-10 animate-spin text-primary" />
              </div>
            </div>
          )}
          {files.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {files.map((file) => (
                <BerkasCard
                  key={`${file.id}-${file.idAktifitas}`}
                  kelas={dataKelas}
                  file={file}
                  onPreview={(file) => {
                    if (!file.link) return

                    setFilePreview({
                      url: file.link,
                      extension: file.extension,
                      image: file.type === 'image',
                    })
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <Text size="sm" weight="medium">
                {search ? 'Berkas tidak ditemukan' : 'Belum ada berkas'}
              </Text>
            </div>
          )}

          {hasNextPage && <Loader ref={refSentry} className="py-4" />}
        </div>
      )}

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />
    </>
  )
}

function ListItemShimmer() {
  return (
    <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(5)].map((_, idx) => (
        <Card key={idx} shadow="sm" rounded="lg" className="flex flex-col">
          <Shimmer className="size-11 mb-4" />
          <Shimmer className="h-3 w-5/12 my-2" />
          <Shimmer className="h-2 w-8/12 my-1.5" />
          <Shimmer className="h-2 w-6/12 my-1" />
        </Card>
      ))}
    </div>
  )
}
