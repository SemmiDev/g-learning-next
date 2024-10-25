import { listAnggotaKelasAction } from '@/actions/pengguna/ruang-kelas/anggota-kelas/peserta/list'
import {
  Card,
  CardSeparator,
  Input,
  Loader,
  Shimmer,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'

type PesertaDaftarAnggotaSectionProps = {
  className?: string
}

export default function PesertaDaftarAnggotaSection({
  className,
}: PesertaDaftarAnggotaSectionProps) {
  const [search, setSearch] = useState('')

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data, isLoading, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [
        'pengguna.ruang-kelas.anggota-kelas.daftar-anggota',
        'peserta',
        idKelas,
      ],
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listAnggotaKelasAction({
          page,
          search,
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

  const list = data?.pages.flatMap((page) => page.list) || []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  useDebounce(() => refetch(), search ? 250 : 0, [refetch, search])

  if (isLoading) return <ShimmerCard className={className} />

  return (
    <Card className={cn('p-0', className)}>
      <div className="p-2">
        <Title as="h6" className="leading-4">
          Anggota Kelas
        </Title>
        <Text size="xs" weight="semibold" variant="lighter" className="mt-1">
          List anggota yang bergabung di dalam kelas
        </Text>
      </div>
      <CardSeparator />
      <div className="flex p-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Anggota Kelas"
          clearable
          className="w-72 sm:w-96"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>
      <div className="flex flex-col">
        {list.length > 0 ? (
          list.map((item, idx) => (
            <Fragment key={idx}>
              <CardSeparator />
              <div className="flex justify-between items-center space-x-2 p-2">
                <div className="flex space-x-3">
                  <Thumbnail
                    src={item.foto || undefined}
                    alt="profil"
                    size={40}
                    rounded="md"
                    avatar={item.nama}
                  />
                  <div className="flex flex-col justify-center">
                    <Text size="sm" weight="semibold" variant="dark">
                      {item.nama}
                    </Text>
                    <Text
                      size="2xs"
                      weight="medium"
                      variant="lighter"
                      className="mt-0.5"
                    >
                      {item.email}
                    </Text>
                  </div>
                </div>
                <Text size="2xs" weight="semibold" variant="lighter">
                  {item.peran || '-'}
                </Text>
              </div>
            </Fragment>
          ))
        ) : (
          <div className="flex items-center justify-center h-40">
            <Text size="sm" weight="medium">
              {search ? 'Anggota tidak ditemukan' : 'Belum ada anggota'}
            </Text>
          </div>
        )}
        {!isLoading && hasNextPage && (
          <Loader ref={refSentry} size="sm" className="py-4" />
        )}
      </div>
    </Card>
  )
}

function ShimmerCard({ className }: { className?: string }) {
  return (
    <Card className={cn('p-0', className)}>
      <div className="flex flex-col space-y-2 px-2 py-2.5">
        <Shimmer className="h-3 w-2/12" />
        <Shimmer className="h-2.5 w-3/12" />
      </div>
      <CardSeparator />
      <div className="px-2 py-2.5">
        <Shimmer className="h-7 w-7/12" />
      </div>
      <CardSeparator />
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
        >
          <div className="flex items-center space-x-2 flex-1 p-2">
            <Shimmer className="size-10" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-2.5 w-4/12" />
              <Shimmer className="h-2.5 w-2/12" />
            </div>
          </div>
          <Shimmer className="h-2 w-9" rounded="md" />
        </div>
      ))}
    </Card>
  )
}
