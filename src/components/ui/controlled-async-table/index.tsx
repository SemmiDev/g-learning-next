'use client'

import type { TableFilterProps } from '@/components/ui/controlled-async-table/filter'
import TableFilter from '@/components/ui/controlled-async-table/filter'
import type { TablePaginationProps } from '@/components/ui/controlled-async-table/pagination'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import Table, { type TableProps } from '@/components/ui/table'
import { SortType } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { AnyObject } from '@/utils/type-interface'
import isEmpty from 'lodash/isEmpty'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Title } from 'rizzui'

export type ControlledAsyncTableActionProps = {
  page: number
  search?: string
  sort?: SortType
  filters?: AnyObject
}

export type ControlledAsyncTableActionType<T extends AnyObject = AnyObject> = {
  data: T[]
  totalData?: number
  perPage?: number
}

export type ControlledAsyncTableProps = TableProps & {
  isLoading?: boolean
  isFetching?: boolean
  showLoadingText?: boolean
  filterElement?: React.ReactElement
  filterOptions?: TableFilterProps
  paginatorOptions?: TablePaginationProps
  tableFooter?: React.ReactNode
  className?: string
  paginatorClassName?: string
}

export default function ControlledAsyncTable({
  isLoading,
  isFetching,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledAsyncTableProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <CgSpinner size={40} className="animate-spin text-primary" />
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
          isFetching && 'cursor-wait [&_th>div]:cursor-wait'
        )}
      >
        {isFetching && (
          <div className="flex justify-center items-center absolute m-auto left-0 right-0 top-0 bottom-0 bg-black/10">
            <div className="size-10 rounded-full bg-white/50">
              <CgSpinner size={40} className="animate-spin text-primary" />
            </div>
          </div>
        )}
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
