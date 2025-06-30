import {
  ActionIconTooltip,
  Card,
  ModalConfirm,
  renderTableCellText,
  TableHeaderCell,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useShowModal } from '@/hooks/use-show-modal'
import { ColumnsType } from 'rc-table'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import LihatModal from './modal/lihat'
import UbahModal from './modal/ubah'

const queryKey = ['instansi.manajemen-prodi.table'] as const

export default function TableProdiCard() {
  const {
    show: showLihat,
    key: keyLihat,
    doShow: doShowLihat,
    doHide: doHideLihat,
  } = useShowModal<string>()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()

  const [idHapus, setIdHapus] = useState<string>()

  // const {
  //   handle: handleHapus,
  //   id: idHapus,
  //   setId: setIdHapus,
  // } = useHandleApiDelete({
  //   action: hapusProdiApi,
  //   refetchKey: queryKey,
  // })

  // const {
  //   data,
  //   isLoading,
  //   isFetching,
  //   page,
  //   perPage,
  //   onPageChange,
  //   totalData,
  //   sort,
  //   onSort,
  //   search,
  //   onSearch,
  // } = useTableAsync({
  //   queryKey,
  //   action: tableProdiApi,
  // })

  const data = [
    {
      id: '1',
      nama: 'Heru Setiawan',
      email: 'heru@uin.ac.id',
      admin: 'Teknik Informatika',
    },
    {
      id: '2',
      nama: 'Putri Ayu',
      email: 'ayu@uin.ac.id',
      admin: 'Bahasa',
    },
    {
      id: '3',
      nama: 'Sulaiman Mandiri',
      email: 'sulaiman@uin.ac.id',
      admin: 'Teknik Elektro',
    },
  ]

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Pengguna"
          sortable
          // sort={getSortOrder(sort, 'nama')}
        />
      ),
      dataIndex: 'nama',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          // onSort('nama')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Email" />,
      dataIndex: 'email',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Admin Prodi" />,
      dataIndex: 'admin',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 105,
      render: (_, row) => (
        <div className="flex justify-center">
          <ActionIconTooltip
            tooltip="Detail"
            size="sm"
            variant="text-colorful"
            color="info"
            onClick={() => doShowLihat(row.id)}
          >
            <LuEye />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Ubah"
            size="sm"
            variant="text-colorful"
            color="warning"
            onClick={() => doShowUbah(row.id)}
          >
            <BsPencilSquare />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Hapus"
            size="sm"
            variant="text-colorful"
            color="danger"
            onClick={() => setIdHapus(row.id)}
          >
            <LuTrash />
          </ActionIconTooltip>
        </div>
      ),
    },
  ]

  return (
    <>
      <Card className="p-0">
        <ControlledAsyncTable
          data={data}
          // isLoading={isLoading}
          // isFetching={isFetching}
          columns={tableColumns}
          rowKey={(row) => row.id}
          // filterOptions={{
          //   searchTerm: search,
          //   onSearchClear: () => onSearch(''),
          //   onSearchChange: (e) => onSearch(e.target.value),
          // }}
          // paginatorOptions={{
          //   current: page,
          //   pageSize: perPage,
          //   total: totalData,
          //   onChange: (page) => onPageChange(page),
          // }}
        />
      </Card>

      <UbahModal show={showUbah} id={keyUbah} onHide={doHideUbah} />
      <LihatModal show={showLihat} id={keyLihat} onHide={doHideLihat} />

      <ModalConfirm
        title="Hapus Prodi"
        desc="Apakah Anda yakin ingin menghapus prodi ini dari database?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        // onConfirm={handleHapus}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
