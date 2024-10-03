'use client'

import { hapusPaketInstansiAction } from '@/actions/admin/paket-instansi/hapus'
import { listPaketInstansiAction } from '@/actions/admin/paket-instansi/list'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useHandleDelete } from '@/hooks/handle/use-handle-delete'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import { fileSizeToKB } from '@/utils/bytes'
import { useMemo, useState } from 'react'
import TambahModal from './modal/tambah'
import UbahModal from './modal/ubah'
import PaketItemCard, { PaketItemType } from './paket-item-card'

const queryKey = ['admin.paket-instansi.list'] as const

export default function PaketInstansiBody() {
  const [showTambah, setShowTambah] = useState(false)
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleDelete({
    action: hapusPaketInstansiAction,
    refetchKey: queryKey,
  })

  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
  } = useTableAsync({
    queryKey,
    action: listPaketInstansiAction,
  })

  const list: PaketItemType[] = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        nama: item.nama,
        totalPenyimpanan: fileSizeToKB(item.batas_penyimpanan, 'MB'),
        penyimpananPengajar: fileSizeToKB(
          item.batas_penyimpanan_pengajar,
          'MB'
        ),
        penyimpananPeserta: fileSizeToKB(item.batas_penyimpanan_peserta, 'MB'),
        limitUser: item.batas_pengguna,
        limitKelas: item.batas_kelas,
        limitKelasPengajar: item.batas_kelas_pengajar,
        harga: item.harga,
      })),
    [data]
  )

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <Title as="h4" size="1.5xl" weight="semibold">
            List Paket Instansi
          </Title>
          {!!list.length && (
            <Button size="sm" onClick={() => setShowTambah(true)}>
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
                  onEdit={() => doShowUbah(item.id)}
                  onDelete={() => setIdHapus(item.id)}
                />
              ))}
            </div>

            <TablePagination
              current={page}
              pageSize={perPage}
              total={totalData}
              isLoading={isFetching}
              paginatorClassName="px-0"
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
                <Button onClick={() => setShowTambah(true)}>
                  Buat Paket Baru
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <TambahModal show={showTambah} setShow={setShowTambah} />

      <UbahModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

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
