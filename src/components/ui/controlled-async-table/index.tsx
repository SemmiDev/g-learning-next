'use client'

import type { TableFilterProps } from '@/components/ui/controlled-async-table/filter'
import type { TablePaginationProps } from '@/components/ui/controlled-async-table/pagination'
import Table, { type TableProps } from '@/components/ui/table'
import { SortType } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import isEmpty from 'lodash/isEmpty'
import dynamic from 'next/dynamic'
import React from 'react'
import { Loader, Title } from 'rizzui'
const TableFilter = dynamic(
  () => import('@/components/ui/controlled-async-table/filter'),
  { ssr: false }
)
const TablePagination = dynamic(
  () => import('@/components/ui/controlled-async-table/pagination'),
  { ssr: false }
)

export type ControlledAsyncTableActionProps = {
  page: number
  search?: string
  sort?: SortType
}
export type ControlledAsyncTableActionType = {
  data: any[]
  totalData: number
}

export type ControlledAsyncTableProps = TableProps & {
  isFirstLoading?: boolean
  isLoading?: boolean
  showLoadingText?: boolean
  filterElement?: React.ReactElement
  filterOptions?: TableFilterProps
  paginatorOptions?: TablePaginationProps
  tableFooter?: React.ReactNode
  className?: string
  paginatorClassName?: string
}

export default function ControlledAsyncTable({
  isFirstLoading,
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledAsyncTableProps) {
  if (isFirstLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    )
  }

  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions}>{filterElement}</TableFilter>
      )}

      <div
        className={cn(
          'relative',
          isLoading && 'cursor-wait [&_th>div]:cursor-wait'
        )}
      >
        <Table
          rowKey={(record) => record.id}
          className={cn(className)}
          {...tableProps}
        />
        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  )
}
