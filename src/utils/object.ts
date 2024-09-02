import { AnyObject } from './type-interface'

const makeOption = <T>(value: T, attrs?: AnyObject) => ({
  label: value + '',
  value: value,
  ...attrs,
})

export const selectOption = makeOption
export const radioGroupOption = makeOption

export const listObjectFromList = <T>(list: T[], count: number): T[] => {
  return [...Array(count)].map((_, idx) => list[idx % list.length])
}
