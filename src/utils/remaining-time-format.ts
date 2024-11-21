import { zeroPad } from './zero-pad'

export const remainingTimeFormat = (remainingTime: number) => {
  const hours = Math.floor(remainingTime / 3600)
  const minutes = Math.floor((remainingTime % 3600) / 60)
  const seconds = remainingTime % 60

  return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`
}
