import {
  ActionIconTooltip,
  Badge,
  Card,
  getSortOrder,
  ModalConfirm,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
  Time,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { NAMA_BULAN } from '@/config/const'
import { routes } from '@/config/routes'
import { useHandleApiDelete } from '@/hooks/handle/use-handle-delete'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import { hapusTagihanInstansiApi } from '@/services/api/admin/tagihan-instansi/hapus'
import { tableTagihanInstansiApi } from '@/services/api/admin/tagihan-instansi/table'
import { parseDate } from '@/utils/date'
import { ellipsis, rupiah } from '@/utils/text'
import { passedTime } from '@/utils/time'
import Link from 'next/link'
import { ColumnsType } from 'rc-table'
import toast from 'react-hot-toast'
import { BsPencilSquare } from 'react-icons/bs'
import { LiaMoneyCheckAltSolid } from 'react-icons/lia'
import { LuCopy, LuTrash } from 'react-icons/lu'
import UbahModal from './modal/ubah'

const queryKey = ['admin.tagihan-instansi.table'] as const

export default function TableTagihanInstansiCard() {
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
  } = useHandleApiDelete({
    action: hapusTagihanInstansiApi,
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
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync({
    queryKey,
    action: tableTagihanInstansiApi,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Instansi"
          sortable
          sort={getSortOrder(sort, 'nama_instansi')}
        />
      ),
      dataIndex: 'nama_instansi',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nama_instansi')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="No. Tagihan"
          sortable
          sort={getSortOrder(sort, 'nomor_invoice')}
        />
      ),
      dataIndex: 'nomor_invoice',
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <TableCellText title={value}>{ellipsis(value, 10)}</TableCellText>
          <ActionIconTooltip
            tooltip="Salin nomor tagihan"
            size="sm"
            variant="text-colorful"
            onClick={async () => {
              await navigator.clipboard.writeText(value)
              toast.success('Nomor tagihan berhasil disalin', {
                position: 'bottom-center',
              })
            }}
          >
            <LuCopy />
          </ActionIconTooltip>
        </div>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nomor_invoice')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Bulan Tagihan" align="center" />,
      dataIndex: 'bulan_tagihan',
      render: (value: number) => (
        <TableCellText align="center">{NAMA_BULAN[value - 1]}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Tahun Tagihan" />,
      dataIndex: 'tahun_tagihan',
      render: renderTableCellTextCenter,
    },
    {
      title: (
        <TableHeaderCell
          title="Tgl. Ditagihkan"
          align="center"
          sortable
          sort={getSortOrder(sort, 'tanggal_tagihan')}
        />
      ),
      dataIndex: 'tanggal_tagihan',
      render: (value: string) => (
        <TableCellText align="center">
          <Time date={value} empty="-" />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('tanggal_tagihan')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Tgl. Jatuh Tempo"
          align="center"
          sortable
          sort={getSortOrder(sort, 'jatuh_tempo')}
        />
      ),
      dataIndex: 'jatuh_tempo',
      render: (value: string, row) => {
        const lunas = row?.status_tagihan === 'Lunas'
        const lewatJatuhTempo = !lunas && passedTime(row.jatuh_tempo)

        return (
          <TableCellText
            align="center"
            color={lewatJatuhTempo ? 'danger' : 'gray'}
            variant={lewatJatuhTempo ? 'default' : 'dark'}
          >
            <Time date={value} empty="-" />
          </TableCellText>
        )
      },
      onHeaderCell: () => ({
        onClick: () => {
          onSort('jatuh_tempo')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Total Tagihan"
          align="center"
          sortable
          sort={getSortOrder(sort, 'total_tagihan')}
        />
      ),
      dataIndex: 'total_tagihan',
      render: (value: number) => (
        <TableCellText align="center">{rupiah(value)}</TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('total_tagihan')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Paket" />,
      dataIndex: 'nama_paket',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Status" />,
      dataIndex: 'status_tagihan',
      render: (value: string, row) => {
        const lunas = row?.status_tagihan === 'Lunas'
        const jatuhTempo = parseDate(row.jatuh_tempo)
        const lewatJatuhTempo = !lunas && passedTime(row.jatuh_tempo)

        return (
          <TableCellText align="center">
            <Badge
              size="sm"
              variant="flat"
              color={
                value === 'Lunas'
                  ? 'success'
                  : lewatJatuhTempo
                  ? 'danger'
                  : 'warning'
              }
              className="text-nowrap"
            >
              {value}
            </Badge>
          </TableCellText>
        )
      },
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 100,
      render: (_, row) => (
        <div className="flex justify-center">
          <Link href={`${routes.admin.tagihanInstansi}/${row.id}`}>
            <ActionIconTooltip
              tooltip="Pembayaran"
              size="sm"
              as="span"
              variant="text-colorful"
              color="primary"
            >
              <LiaMoneyCheckAltSolid className="size-5" />
            </ActionIconTooltip>
          </Link>
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
          isLoading={isLoading}
          isFetching={isFetching}
          columns={tableColumns}
          rowKey={(row) => row.id}
          filterOptions={{
            searchTerm: search,
            onSearchClear: () => onSearch(''),
            onSearchChange: (e) => onSearch(e.target.value),
          }}
          paginatorOptions={{
            current: page,
            pageSize: perPage,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
        />
      </Card>

      <UbahModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <ModalConfirm
        title="Hapus Tagihan Instansi"
        desc="Apakah Anda yakin ingin menghapus tagihan ini?"
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
