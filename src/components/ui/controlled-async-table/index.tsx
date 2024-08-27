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

export type ControlledAsyncTableActionProps = {
  page?: number
  perPage?: number
  search?: string
  sort?: SortType
  filters?: AnyObject
}

export type ControlledAsyncTableActionType<T extends AnyObject = AnyObject> = {
  success: boolean
  message?: string
  error?: string
  data?: {
    list?: T[]
    pagination?: {
      page?: number
      perPage?: number
      totalData?: number
      lastPage?: number
      from?: number
      to?: number
    }
  }
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
  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions}>{filterElement}</TableFilter>
      )}

      <div className="relative">
        {isFetching && (
          <div className="flex justify-center items-center absolute m-auto left-0 right-0 top-0 bottom-0 bg-black/10">
            <div className="size-10 rounded-full bg-white/50">
              <CgSpinner size={40} className="animate-spin text-primary" />
            </div>
          </div>
        )}
        <Table
          rowKey={(record) => record.id}
          isLoading={isLoading}
          className={cn(className)}
          {...tableProps}
        />
        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination
          isLoading={isFetching}
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  )
}
