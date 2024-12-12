import { lihatTagihanInstansiAction } from '@/actions/admin/tagihan-instansi/lihat'
import { hapusPembayaranTagihanInstansiAction } from '@/actions/admin/tagihan-instansi/pembayaran/hapus'
import { tablePembayaranTagihanInstansiAction } from '@/actions/admin/tagihan-instansi/pembayaran/table'
import {
  ActionIconTooltip,
  Card,
  CardSeparator,
  getSortOrder,
  ModalConfirm,
  TableCellText,
  TableHeaderCell,
  Text,
  Time,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { rupiah } from '@/utils/text'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ColumnsType } from 'rc-table'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsPencilSquare } from 'react-icons/bs'
import { LuCopy, LuEye, LuTrash } from 'react-icons/lu'
import { Tooltip } from 'rizzui'
import LihatModal from './modal/lihat'
import UbahModal from './modal/ubah'
import RincianItem from './rincian-item'

export default function TablePembayaranTagihanInstansiCard() {
  const queryClient = useQueryClient()
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

  const { id: idTagihan }: { id: string } = useParams()

  const queryKeyTagihan = ['admin.tagihan-instansi.pembayaran', idTagihan]

  const { data: dataTagihan } = useQuery({
    queryKey: queryKeyTagihan,
    queryFn: makeSimpleQueryDataWithId(lihatTagihanInstansiAction, idTagihan),
  })

  const queryKey = ['admin.tagihan-instansi.pembayaran.table', idTagihan]

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
    action: tablePembayaranTagihanInstansiAction,
    actionParams: { idTagihan },
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Tanggal Pembayaran"
          sortable
          sort={getSortOrder(sort, 'tanggal_pembayaran')}
        />
      ),
      dataIndex: 'tanggal_pembayaran',
      render: (value: string) => (
        <TableCellText>
          <Time date={value} />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('tanggal_pembayaran')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Nominal Pembayaran"
          align="center"
          sortable
          sort={getSortOrder(sort, 'jumlah_pembayaran')}
        />
      ),
      dataIndex: 'jumlah_pembayaran',
      render: (value: number) => (
        <TableCellText align="center">{rupiah(value)}</TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('jumlah_pembayaran')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="No. Pembayaran"
          sortable
          sort={getSortOrder(sort, 'nomor_pembayaran')}
        />
      ),
      dataIndex: 'nomor_pembayaran',
      render: (value: string) => (
        <div className="flex items-center gap-1">
          <TableCellText title={value}>{value}</TableCellText>
          <ActionIconTooltip
            tooltip="Salin nomor pembayaran"
            size="sm"
            variant="text-colorful"
            onClick={async () => {
              await navigator.clipboard.writeText(value)
              toast.success('Nomor pembayaran berhasil disalin', {
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
          onSort('nomor_pembayaran')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 100,
      render: (_, row) => (
        <div className="flex justify-center">
          <ActionIconTooltip
            tooltip="Lihat"
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

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(
      hapusPembayaranTagihanInstansiAction(idTagihan, idHapus),
      {
        loading: 'Menghapus...',
        onSuccess: () => {
          setIdHapus(undefined)

          queryClient.invalidateQueries({ queryKey })
          queryClient.invalidateQueries({ queryKey: queryKeyTagihan })
        },
      }
    )
  }

  const lunas = dataTagihan?.status_tagihan === 'Lunas'
  const jatuhTempo = parseDate(dataTagihan?.jatuh_tempo)
  const lewatJatuhTempo = !lunas && jatuhTempo && jatuhTempo < new Date()

  return (
    <>
      <Card className="p-0">
        <div className="flex flex-col justify-between gap-x-6 gap-y-2 px-2.5 py-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <RincianItem
              label="Nomor Tagihan"
              value={dataTagihan?.nomor_invoice}
            />
            <RincianItem label="Instansi" value={dataTagihan?.nama_instansi} />
            <RincianItem label="Jenis Paket" value={dataTagihan?.nama_paket} />
            <RincianItem
              label="Tgl. Jatuh Tempo"
              value={<Time date={dataTagihan?.jatuh_tempo} empty="-" />}
              color={lewatJatuhTempo ? 'danger' : 'gray'}
              variant={lewatJatuhTempo ? 'default' : 'dark'}
            />
            <RincianItem
              label="Total Tagihan"
              value={rupiah(dataTagihan?.total_tagihan || 0)}
            />
          </div>
          <RincianItem label="Status">
            <Tooltip
              color="invert"
              content={`Total Pembayaran ${rupiah(
                dataTagihan?.total_pembayaran || 0
              )}`}
              placement="left"
            >
              <Text
                size="1.5xl"
                weight="semibold"
                color={
                  lunas ? 'success' : lewatJatuhTempo ? 'danger' : 'warning'
                }
                className="text-nowrap"
              >
                {dataTagihan?.status_tagihan || '-'}
              </Text>
            </Tooltip>
          </RincianItem>
        </div>

        <CardSeparator />

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

      <LihatModal show={showLihat} id={keyLihat} onHide={doHideLihat} />

      <UbahModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <ModalConfirm
        title="Hapus Pembayaran Tagihan Instansi"
        desc="Apakah Anda yakin ingin menghapus pembayaran ini?"
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
