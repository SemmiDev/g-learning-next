import {
  ControlledAsyncTableActionProps,
  ControlledAsyncTableActionType,
} from '@/components/ui/controlled-async-table'
import { AnyObject } from '@/utils/type-interface'
import _ from 'lodash'
import isString from 'lodash/isString'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'react-use'

export type SortType = {
  name?: string
  direction?: 'asc' | 'desc'
}

export function useTableAsync<T extends AnyObject = AnyObject>({
  key,
  action,
  initialFilterState,
}: {
  key: string[]
  action: (
    actionProps: ControlledAsyncTableActionProps
  ) => Promise<ControlledAsyncTableActionType<T>>
  initialFilterState?: Partial<Record<string, any>>
}) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  )
  const [sort, setSort] = useState<SortType>()
  const [totalData, setTotalData] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const {
    data = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery<T[]>({
    queryKey: key,
    queryFn: async () => {
      const resData = await action({ page, search, sort, filters })
      setTotalData(resData.totalData)

      return resData.data
    },
  })

  /*
   * Handle row selection
   */
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
    } else if (data.length) {
      setSelectedRowKeys(data.map((record) => record.id))
    }
  }

  /*
   * Handle sorting
   */
  function onSort(name: string) {
    const direction =
      sort?.name === name && sort?.direction === 'asc' ? 'desc' : 'asc'

    setSort({
      name,
      direction: direction,
    })
  }

  /*
   * Handle pagination
   */
  function onPageChange(pageNumber: number) {
    setPage(pageNumber)
  }

  /*
   * Handle Filters and searching
   */
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

    // set to page 1
    setPage(1)
  }

  /*
   * Handle searching
   */
  function onSearch(searchValue: string) {
    setSearch(searchValue)
    setPage(1)
  }

  /*
   * Handle Reset search and filters
   */
  function onReset() {
    onSearch('')

    if (initialFilterState) return setFilters(initialFilterState)
  }

  const isFiltered = !_.isEqual(filters, initialFilterState)

  /*
   * Refetch data with debounce when searching and filtering
   */
  useDebounce(
    () => {
      refetch()
    },
    250,
    [refetch, search, filters]
  )

  /*
   * Refetch data when sorting and change page
   */
  useEffect(() => {
    refetch()
  }, [refetch, sort, page])

  // useTable returns
  return {
    data,
    isLoading: isLoading,
    isFetching: isFetching,
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
