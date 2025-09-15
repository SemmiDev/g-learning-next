import { getLocalStorage, setLocalStorage } from '@/utils/localstorage'
import { AnyObject } from '@/utils/type-interface'
import { useEffect, useState } from 'react'

export const useLocalStorage = <T extends AnyObject>(
  key: string,
  defaultValue: T
) => {
  const [value, setValue] = useState(() => {
    return getLocalStorage(key, defaultValue)
  })

  useEffect(() => {
    setLocalStorage(key, value)
  }, [key, value])

  return [value, setValue]
}
