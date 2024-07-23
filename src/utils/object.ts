import { SelectOptionType } from '@/components/ui'
import { AnyObject } from './type-interface'

export const selectOption = (
  value: string,
  attrs?: AnyObject
): SelectOptionType => ({
  label: value,
  value: value,
  ...attrs,
})

export const listObjectFromList = <T>(list: T[], count: number): T[] => {
  return [...Array(count)].map((_, idx) => list[idx % list.length])
}
