'use client'

import {
  getSortDirection,
  renderTableCellNumber,
  renderTableCellText,
  TableHeaderCell,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useTableAsync } from '@/hooks/use-table-async'
import { useState } from 'react'
import { tesAsyncAction } from './actions'
import FilterElement from './filter-element'

export default function Tes3Table() {
  const [pageSize, setPageSize] = useState(5)
  const [checkedColumns, setCheckedColumns] = useState<string[]>(['single'])
  const [search, setSearch] = useState('')

  const {
    data,
    isFirstLoading,
    isLoading,
    page,
    onPageChange,
    totalData,
    sort,
    onSort,
    filters,
    updateFilter,
    isFiltered,
    onReset,
  } = useTableAsync(tesAsyncAction, {
    nama: '',
    email: '',
  })

  const tableColumns = [
    {
      title: <TableHeaderCell title="#" align="center" />,
      width: 20,
      render: renderTableCellNumber,
    },
    {
      title: (
        <TableHeaderCell
          title="Nama"
          sortable
          sort={getSortDirection(sort, 'nama')}
        />
      ),
      dataIndex: 'nama',
      key: 'nama',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nama')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Email"
          sortable
          sort={getSortDirection(sort, 'email')}
        />
      ),
      dataIndex: 'email',
      key: 'email',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('email')
        },
      }),
    },
  ]

  return (
    <>
      <ControlledAsyncTable
        data={data}
        isFirstLoading={isFirstLoading}
        isLoading={isLoading}
        columns={tableColumns}
        rowKey={(record) => record.id}
        filterOptions={{
          searchTerm: search,
          onSearchClear: () => setSearch(''),
          onSearchChange: (e) => setSearch(e.target.value),
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            onReset={onReset}
          />
        }
        paginatorOptions={{
          pageSize,
          setPageSize,
          current: page,
          total: totalData,
          onChange: (page) => onPageChange(page),
        }}
      />
    </>
  )
}
