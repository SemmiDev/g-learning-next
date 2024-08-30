import { hashToRangeNumber } from '@/utils/hash'

type HSL = [number, number, number]

const hRange = [0, 360]
const sRange = [70, 90]
const lRange = [30, 50]

const generateHSL = (name: string): HSL => {
  const h = hashToRangeNumber(name, hRange[1], hRange[0])
  const s = hashToRangeNumber(name, sRange[1], sRange[0])
  const l = hashToRangeNumber(name, lRange[1], lRange[0])

  return [h, s, l]
}

const colorHSL = (hsl: HSL) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`
}

export type ImageName = {
  name: string
  size: number
}

export default function ImageName({ name, size }: ImageName) {
  const alias = name
    .split(' ', 2)
    .map((str) => str[0])
    .join('')
  const fontSize = size * (alias.length > 1 ? 0.45 : 0.55)

  return (
    <div
      className="flex justify-center items-center select-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colorHSL(generateHSL(name)),
      }}
    >
      <span
        className="font-medium text-white"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {alias}
      </span>
    </div>
  )
}
