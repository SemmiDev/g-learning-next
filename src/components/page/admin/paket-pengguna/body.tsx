'use client'

import { hapusPaketPenggunaAction } from '@/actions/admin/paket-pengguna/hapus'
import { listPaketPenggunaAction } from '@/actions/admin/paket-pengguna/list'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useTableAsync } from '@/hooks/use-table-async'
import { handleActionWithToast } from '@/utils/action'
import { fileSizeToKB } from '@/utils/bytes'
import { useMemo, useState } from 'react'
import TambahModal from './modal/tambah'
import UbahModal from './modal/ubah'
import PaketItemCard, { PaketItemType } from './paket-item-card'

export default function PaketPenggunaBody() {
  const [showTambahModal, setShowTambahModal] = useState(false)
  const [idUbah, setIdUbah] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    page,
    perPage,
    onPageChange,
    totalData,
  } = useTableAsync({
    key: ['admin.paket-pengguna.list'],
    action: listPaketPenggunaAction,
  })

  const list: PaketItemType[] = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        nama: item.nama,
        totalPenyimpanan: fileSizeToKB(item.batas_penyimpanan, 'MB'),
        limitKelas: item.batas_kelas,
        limitAnggotaKelas: item.batas_anggota_kelas,
        harga: item.harga,
      })),
    [data]
  )

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusPaketPenggunaAction(idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)
        refetch()
      },
    })
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <Title as="h4" size="1.5xl" weight="semibold">
            List Paket Pengguna
          </Title>
          {!!list.length && (
            <Button size="sm" onClick={() => setShowTambahModal(true)}>
              Buat Paket Baru
            </Button>
          )}
        </div>

        {list.length ? (
          <>
            <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
              {list.map((item) => (
                <PaketItemCard
                  key={item.id}
                  paket={item}
                  onEdit={() => setIdUbah(item.id)}
                  onDelete={() => setIdHapus(item.id)}
                />
              ))}
            </div>

            <TablePagination
              current={page}
              pageSize={perPage}
              total={totalData}
              isLoading={isFetching}
              onChange={(page) => onPageChange(page)}
            />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-2 h-64">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <Text weight="medium">Paket Masih Kosong</Text>
                <Button onClick={() => setShowTambahModal(true)}>
                  Buat Paket Baru
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <TambahModal
        showModal={showTambahModal}
        setShowModal={setShowTambahModal}
      />
      <UbahModal id={idUbah} setId={setIdUbah} />

      <ModalConfirm
        title="Hapus Paket"
        desc="Apakah Anda yakin ingin menghapus paket ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="warning"
        closeOnCancel
      />
    </>
  )
}
