import { AnyObject } from '@/utils/type-interface'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useSetSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setSearchParams = (params: AnyObject, replace = false) => {
    const newSearchParams = new URLSearchParams(
      !replace ? searchParams.toString() : undefined
    )

    Object.entries(params).forEach(([k, v]) => {
      newSearchParams.set(k, v)
    })

    const search = newSearchParams.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`, {
      scroll: false,
    })
  }

  return setSearchParams
}
