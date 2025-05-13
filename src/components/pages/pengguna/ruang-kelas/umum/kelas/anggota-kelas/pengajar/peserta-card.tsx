import { keluarkanAnggotaKelasAction } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/pengajar/keluarkan'
import { listPesertaKelasAction } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/pengajar/list-peserta'
import { lihatKelasAction } from '@/services/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  Input,
  ModalConfirm,
  Shimmer,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useTableAsync } from '@/hooks/use-table-async'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import PengajarUndangAnggotaModal from './modal/undang-anggota'

type PengajarAnggotaCardProps = {
  className?: string
}

export default function PengajarPesertaCard({
  className,
}: PengajarAnggotaCardProps) {
  const queryClient = useQueryClient()
  const [showUndang, setShowUndang] = useState(false)
  const [idKeluarkan, setIdKeluarkan] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const queryKey = [
    'pengguna.ruang-kelas.anggota-kelas.daftar-peserta',
    'pengajar',
    idKelas,
  ]

  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
    search,
    onSearch,
  } = useTableAsync({
    queryKey,
    action: listPesertaKelasAction,
    actionParams: { idKelas },
  })

  const handleKeluarkan = () => {
    if (!idKeluarkan) return

    handleActionWithToast(keluarkanAnggotaKelasAction(idKelas, idKeluarkan), {
      loading: 'Mengeluarkan anggota...',
      onSuccess: () => {
        setIdKeluarkan(undefined)

        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  if (isLoading) return <CardShimmer className={className} />

  return (
    <>
      <Card className={cn('p-0', className)}>
        <div className="p-2">
          <Title as="h6" className="leading-4">
            Anggota Kelas
          </Title>
          <Text size="xs" weight="semibold" variant="lighter" className="mt-1">
            List peserta yang bergabung di dalam kelas
          </Text>
        </div>
        <CardSeparator />
        <div className="flex justify-between p-2">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Anggota Kelas"
            clearable
            className="w-72 sm:w-96"
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => onSearch('')}
          />
          {dataKelas?.kelas.tipe !== 'Akademik' && (
            <Button size="sm" onClick={() => setShowUndang(true)}>
              Undang Anggota
            </Button>
          )}
        </div>
        <CardSeparator />
        <div className="flex flex-col">
          {data.map((item) => {
            return (
              <Fragment key={item.id}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-3 p-2">
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
                        {item.email || '-'}
                      </Text>
                    </div>
                  </div>
                  {dataKelas?.kelas.tipe !== 'Akademik' && (
                    <Button
                      size="sm"
                      variant="outline"
                      color="danger"
                      className="m-2"
                      onClick={() => setIdKeluarkan(item.id_peserta)}
                    >
                      Keluarkan
                    </Button>
                  )}
                </div>
                <CardSeparator />
              </Fragment>
            )
          })}
        </div>

        <TablePagination
          isLoading={isFetching}
          current={page}
          pageSize={perPage}
          total={totalData}
          onChange={(page) => onPageChange(page)}
        />
      </Card>

      <ModalConfirm
        title="Keluarkan Anggota Kelas"
        desc="Apakah Anda yakin ingin mengeluarkan peserta ini dari kelas anda?"
        color="danger"
        isOpen={!!idKeluarkan}
        onClose={() => setIdKeluarkan(undefined)}
        onConfirm={handleKeluarkan}
        closeOnCancel
      />

      <PengajarUndangAnggotaModal
        showModal={showUndang}
        setShowModal={setShowUndang}
      />
    </>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('p-0', className)}>
      <div className="flex flex-col gap-y-2 px-2 py-2.5">
        <Shimmer className="h-3 w-2/12" />
        <Shimmer className="h-2.5 w-3/12" />
      </div>
      <CardSeparator />
      <div className="flex justify-between gap-x-2 px-2 py-2.5">
        <Shimmer className="h-7 w-7/12" />
        <Shimmer className="h-7 w-28" />
      </div>
      <CardSeparator />
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
        >
          <div className="flex items-center gap-x-2 flex-1">
            <Shimmer className="size-10" />
            <div className="flex flex-col flex-1 gap-y-2">
              <Shimmer className="h-2.5 w-4/12" />
              <Shimmer className="h-2.5 w-2/12" />
            </div>
          </div>
          <Shimmer className="h-7 w-20" />
        </div>
      ))}
    </Card>
  )
}
