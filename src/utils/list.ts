export const removeIndexFromList = (list: any[], idx: number) => {
  const newList = [...list]
  newList.splice(idx, 1)

  return newList
}

export const removeFromList = <T>(list: T[], value: T) => {
  const idx = list.indexOf(value)

  if (idx < 0) return list

  return removeIndexFromList(list, idx)
}
