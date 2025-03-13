import Chance from 'chance'
import { AnyObject } from './type-interface'

export const removeIndexFromList = <T>(list: T[], idx: number) => {
  const newList = [...list]
  newList.splice(idx, 1)

  return newList
}

export const removeFromList = <T>(list: T[], value: T) => {
  const idx = list.indexOf(value)

  if (idx < 0) return list

  return removeIndexFromList(list, idx)
}

export const removeFromListWhere = <T extends AnyObject>(
  list: T[],
  where: (item: T) => boolean
) => {
  const idx = list.findIndex((item) => where(item))

  if (idx < 0) return list

  return removeIndexFromList(list, idx)
}

export const shuffleListWithSeed = <T>(list: T[], seed: string) => {
  const chance = new Chance(seed)
  const newList = [...list]
  let currentIndex = newList.length

  while (currentIndex != 0) {
    let randomIndex = Math.floor(
      chance.floating({ min: 0, max: 1 }) * currentIndex
    )
    currentIndex--
    ;[newList[currentIndex], newList[randomIndex]] = [
      newList[randomIndex],
      newList[currentIndex],
    ]
  }

  return newList
}
