import {
  ControlledAsyncTableActionType,
  ControlledAsyncTableApiProps,
} from '@/components/ui/controlled-async-table'
import { DEFAULT_DATA_PER_PAGE } from '@/config/const'
import { AnyObject } from '@/utils/type-interface'
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import _ from 'lodash'
import isString from 'lodash/isString'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { useSessionJwt } from './use-session-jwt'

export type SortType = {
  name?: string
  order?: 'asc' | 'desc'
}

export function useInfiniteListAsync<
  T extends AnyObject = AnyObject,
  TFilters extends AnyObject = AnyObject
>({
  queryKey,
  action,
  actionParams,
  initialFilter,
  initialSort,
  initialPerPage = DEFAULT_DATA_PER_PAGE,
  enabled,
}: {
  queryKey: QueryKey
  action: (
    actionProps: ControlledAsyncTableApiProps
  ) => Promise<ControlledAsyncTableActionType<T>>
  actionParams?: AnyObject
  initialFilter?: TFilters
  initialSort?: SortType
  initialPerPage?: number
  enabled?: boolean
}) {
  const jwt = useSessionJwt()
  const [perPage, setPerPage] = useState(initialPerPage)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<TFilters>(
    initialFilter ?? ({} as TFilters)
  )
  const [sort, setSort] = useState<SortType | undefined>(initialSort)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const {
    data: dataWithInfo,
    refetch,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data, success, message } = await action({
        jwt,
        page,
        search,
        sort,
        filters,
        params: actionParams,
        perPage,
      })

      if (!success) {
        console.error(message)

        throw new Error(message)
      }

      setPerPage(data?.pagination?.perPage ?? DEFAULT_DATA_PER_PAGE)

      return {
        list: data?.list ?? [],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
    enabled,
  })

  const data = dataWithInfo?.pages.flatMap((page) => page?.list) ?? []

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
      setSelectedRowKeys(data.map((row) => row?.id))
    }
  }

  /*
   * Handle sorting
   */
  function onSort(name: string, order?: 'asc' | 'desc') {
    const newOrder =
      order ?? (sort?.name === name && sort?.order === 'asc' ? 'desc' : 'asc')

    if (name === sort?.name && sort?.order === newOrder) return

    setSort({
      name,
      order: newOrder,
    })
  }

  /*
   * Handle Filters and searching
   */
  function updateFilter(
    columnId: string,
    filterValue: string | any[] | undefined | null
  ) {
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

    if (initialFilter) return setFilters(initialFilter)
  }

  const isFiltered = !_.isEqual(filters, initialFilter)

  /*
   * Refetch data with debounce when searching
   */
  useDebounce(() => refetch(), search ? 250 : 0, [refetch, search])

  /*
   * Refetch data when sorting, filtering and changing page
   */
  useEffect(() => {
    refetch()
  }, [refetch, sort, filters, page, perPage])

  /* Return values */
  return {
    data,
    isLoading: isLoading,
    isFetching: isFetching,
    refetch,
    // pagination
    perPage,
    setPerPage,
    hasNextPage,
    fetchNextPage,
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
