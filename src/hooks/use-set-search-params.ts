import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useSetSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setSearchParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set(key, value)

    const search = newSearchParams.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`, {
      scroll: false,
    })
  }

  return setSearchParams
}
