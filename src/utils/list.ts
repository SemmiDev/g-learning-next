export const removeFromList = (list: any[], idx: number) => {
  const newList = [...list]
  newList.splice(idx, 1)

  return newList
}
