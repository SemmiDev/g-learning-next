'use client'

import {
  getSortDirection,
  renderTableCellNumber,
  renderTableCellText,
  TableHeaderCell,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useTableAsync } from '@/hooks/use-table-async'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { DataType, tesAsyncAction } from './actions'
import FilterElement from './filter-element'

export default function Tes3Table() {
  const [pageSize, setPageSize] = useState(5)

  const {
    data,
    isLoading,
    isFetching,
    page,
    onPageChange,
    totalData,
    sort,
    onSort,
    search,
    onSearch,
    filters,
    updateFilter,
    isFiltered,
    onReset,
  } = useTableAsync({
    queryKey: ['tes'],
    action: tesAsyncAction,
    initialFilterState: {
      nama: '',
      email: '',
    },
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
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
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id}
        filterOptions={{
          searchTerm: search,
          onSearchClear: () => onSearch(''),
          onSearchChange: (e) => onSearch(e.target.value),
          className: 'px-0',
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
          paginatorClassName: 'px-0',
        }}
      />
    </>
  )
}
