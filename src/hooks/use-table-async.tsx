import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { AnyObject } from '@/utils/type-interface'
import _ from 'lodash'
import isString from 'lodash/isString'
import { useEffect, useState } from 'react'

export type SortType = {
  name?: string
  direction?: 'asc' | 'desc'
}

export function useTableAsync<T extends AnyObject>(
  action: (
    actionProps: ControlledAsyncTableActionProps
  ) => Promise<ControlledAsyncTableActionType>,
  initialFilterState?: Partial<Record<string, any>>
) {
  const [data, setData] = useState<T[]>([])
  const [totalData, setTotalData] = useState(1)
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const onRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys]
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey))
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey])
    }
  }
  const onSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([])
    } else {
      setSelectedRowKeys(data.map((record) => record.id))
    }
  }

  /*
   * Handle sorting
   */
  const [sort, setSort] = useState<SortType>({
    name: undefined,
    direction: undefined,
  })

  function onSort(name: string) {
    setIsLoading(true)

    const direction =
      sort.name === name && sort.direction === 'asc' ? 'desc' : 'asc'

    setSort({
      name,
      direction: direction,
    })
  }

  /*
   * Handle pagination
   */
  const [page, setPage] = useState(1)

  function onPageChange(pageNumber: number) {
    setPage(pageNumber)
  }

  /*
   * Handle Filters and searching
   */
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  )

  function updateFilter(columnId: string, filterValue: string | any[]) {
    if (!Array.isArray(filterValue) && !isString(filterValue)) {
      throw new Error('filterValue data type should be string or array of any')
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error('filterValue data must be an array of length 2')
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: filterValue,
    }))
  }

  /*
   * Handle searching
   */
  function onSearch(searchValue: string) {
    setSearch(searchValue)
  }

  /*
   * Reset search and filters
   */
  function onReset() {
    onSearch('')

    if (initialFilterState) return setFilters(initialFilterState)
  }

  /**
   * Load data from action
   */
  useEffect(() => {
    ;(async () => {
      const resData = await action({ page, search, sort, filters })

      setData(resData.data)
      setTotalData(resData.totalData)

      setIsFirstLoading(false)
      setIsLoading(false)
    })()
  }, [action, page, search, sort, filters])

  const isFiltered = !_.isEqual(filters, initialFilterState)

  /*
   * Go to first page when data is filtered and searched
   */
  useEffect(() => {
    onPageChange(1)
  }, [filters, search])

  // useTable returns
  return {
    data,
    isFirstLoading,
    isLoading,
    // pagination
    page,
    onPageChange,
    totalData,
    // sorting
    sort,
    onSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    onRowSelect,
    onSelectAll,
    // searching
    search,
    onSearch,
    // filters
    filters,
    updateFilter,
    isFiltered,
    onReset,
  }
}
