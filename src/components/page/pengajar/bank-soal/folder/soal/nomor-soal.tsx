import { Button, Text } from '@/components/ui'
import { RefObject } from 'react'
import { SoalType, TipeSoalType } from './body'

type NomorSoalProps = {
  canBeChanged: boolean
  tipeSoal: TipeSoalType
  listSoalPilihan: SoalType[]
  listSoalEsai: SoalType[]
  listSoal: SoalType[]
  soalRef: RefObject<HTMLDivElement>[]
  soalBaruRef: RefObject<HTMLDivElement | null>
}

export default function NomorSoal({
  canBeChanged,
  tipeSoal,
  listSoalPilihan,
  listSoalEsai,
  listSoal,
  soalRef,
  soalBaruRef,
}: NomorSoalProps) {
  return (
    <div className="flex flex-col pb-2">
      <Text
        size="sm"
        weight="semibold"
        variant="dark"
        className="text-center py-2"
      >
        Soal yang sudah dibuat
      </Text>
      <div className="max-h-96 overflow-y-auto m-auto px-2 pb-2">
        <Text
          size="sm"
          weight="semibold"
          variant="dark"
          className="text-center pb-1.5"
        >
          Pilihan Ganda
        </Text>
        <div className="grid grid-cols-10 gap-2 mb-2 md:grid-cols-15 md:gap-3 md:px-2 lg:grid-cols-5 lg:px-3">
          {listSoalPilihan.map((soal, idx) => (
            <div
              key={`pilihan.${idx}`}
              className="flex justify-center items-center"
            >
              <Button
                size="sm"
                variant="outline"
                className="size-8"
                onClick={() => {
                  soalRef[idx]?.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                {idx + 1}
              </Button>
            </div>
          ))}
          {canBeChanged && tipeSoal === 'single-choice' && (
            <div className="flex justify-center items-center">
              <Button
                size="sm"
                variant="solid"
                className="size-8"
                onClick={() => {
                  soalBaruRef.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                {listSoal.length + 1}
              </Button>
            </div>
          )}
        </div>
        <Text
          size="sm"
          weight="semibold"
          variant="dark"
          className="text-center pb-1.5"
        >
          Esai
        </Text>
        <div className="grid grid-cols-10 gap-2 md:grid-cols-15 md:gap-3 md:px-2 lg:grid-cols-5 lg:px-3">
          {listSoalEsai.map((soal, idx) => (
            <div
              key={`esai.${idx}`}
              className="flex justify-center items-center"
            >
              <Button
                size="sm"
                variant="outline"
                className="size-8"
                onClick={() => {
                  soalRef[
                    listSoalPilihan.length + idx
                  ]?.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                {idx + 1}
              </Button>
            </div>
          ))}
          {canBeChanged && tipeSoal === 'essay' && (
            <div className="flex justify-center items-center">
              <Button
                size="sm"
                variant="solid"
                className="size-8"
                onClick={() => {
                  soalBaruRef.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }}
              >
                {listSoal.length + 1}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
