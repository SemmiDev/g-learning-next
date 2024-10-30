import { listPermintaanBergabungKelasAction } from '@/actions/pengguna/ruang-kelas/anggota-kelas/pengajar/list-permintaan-bergabung'
import {
  Button,
  Card,
  CardSeparator,
  Loader,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Checkbox } from 'rizzui'

type PengajarPermintaanBergabungCardProps = {
  className?: string
}

export default function PengajarPermintaanBergabungCard({
  className,
}: PengajarPermintaanBergabungCardProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.anggota-kelas.permintaan-bergabung',
    'pengajar',
    idKelas,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listPermintaanBergabungKelasAction({
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

  const allCheck = Object.values(checked)
  const isAllChecked =
    list.length === allCheck.length && allCheck.every((v) => v)

  const handleCentangSemua = (checked: boolean) => {
    setChecked(
      list.reduce((o, item) => ({ ...o, [item.id_peserta]: checked }), {})
    )
  }

  return (
    <Card className={cn('p-0 lg:sticky lg:right-0 lg:top-24', className)}>
      <div className="flex flex-col p-2">
        <Title as="h6" weight="semibold" className="leading-4">
          Permintaan Bergabung
        </Title>
        <Checkbox
          size="sm"
          label="Centang semua permintaan"
          className="text-gray-lighter text-xs w-fit mt-2"
          iconClassName="h-3 top-1"
          checked={isAllChecked}
          onChange={(e) => handleCentangSemua(e.target.checked)}
        />
      </div>
      <CardSeparator />
      <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
        {list.map((item) => {
          return (
            <label
              key={item.id}
              className="flex space-x-2 p-2 hover:bg-gray-50/70"
            >
              <Checkbox
                size="sm"
                iconClassName="h-3 top-1"
                checked={!!checked[item.id_peserta]}
                onChange={(e) =>
                  setChecked((prev) => ({
                    ...prev,
                    [item.id_peserta]: e.target.checked,
                  }))
                }
              />
              <Thumbnail
                src={item.foto || undefined}
                alt="profil"
                size={38}
                rounded="md"
                avatar={item.nama}
              />
              <div className="flex flex-col">
                <Text size="sm" weight="semibold" variant="dark">
                  {item.nama}
                </Text>
                <Text size="2xs" weight="medium" variant="lighter">
                  {item.email || '-'}
                </Text>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm">Terima</Button>
                  <Button size="sm" color="danger">
                    Tolak
                  </Button>
                </div>
              </div>
            </label>
          )
        })}
        {!isLoading && hasNextPage && (
          <Loader ref={refSentry} size="sm" className="py-4" />
        )}
      </div>
      <CardSeparator />
      <div className="flex space-x-2 p-2">
        <Button size="sm" className="flex-1">
          Terima Ditandai
        </Button>
      </div>
    </Card>
  )
}
