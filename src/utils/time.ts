export const passedTime = (targetTime: string | undefined | null) => {
  return !!targetTime && new Date(targetTime) < new Date()
}
