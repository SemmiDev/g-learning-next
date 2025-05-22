'use client'

import { useState } from 'react'
import { useDebounce } from 'react-use'

export function useDebounceSearch(initialSearch: string) {
  const [inputSearch, setInputSearch] = useState(initialSearch)
  const [search, setSearch] = useState(inputSearch)

  useDebounce(() => setSearch(inputSearch), inputSearch ? 250 : 0, [
    inputSearch,
  ])

  return { inputSearch, setInputSearch, search }
}
