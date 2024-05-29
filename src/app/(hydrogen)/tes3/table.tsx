'use client'

import {
  renderTableCellNumber,
  renderTableCellText,
  Table,
  TableHeaderCell,
} from '@/components/ui'

export default function Tes3Table() {
  const tableColumns = [
    {
      title: <TableHeaderCell title="#" align="center" />,
      width: 20,
      render: renderTableCellNumber,
    },
    {
      title: <TableHeaderCell title="Nama" />,
      dataIndex: 'nama',
      key: 'nama',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Email" />,
      dataIndex: 'email',
      key: 'email',
      render: renderTableCellText,
    },
  ]

  const tableData = [
    {
      id: 1,
      nama: 'Nama 1',
      email: 'email1@namaweb.com',
    },
    {
      id: 2,
      nama: 'Nama 2',
      email: 'email2@namaweb.com',
    },
    {
      id: 3,
      nama: 'Nama 3',
      email: 'email3@namaweb.com',
    },
    {
      id: 4,
      nama: 'Nama 4',
      email: 'email4@namaweb.com',
    },
    {
      id: 5,
      nama: 'Nama 5',
      email: 'email5@namaweb.com',
    },
  ]

  return (
    <Table
      rowKey={(record) => record.id}
      variant="elegant"
      columns={tableColumns}
      data={tableData}
    />
  )
}
