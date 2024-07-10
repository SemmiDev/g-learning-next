'use client'

import { Button, Card, CardSeparator, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { SoalType } from './ujian-body'

const boxColor = (color: 'green' | 'orange' | 'white'): string => {
  switch (color) {
    case 'green':
      return 'bg-green border-green-700 text-white'
    case 'orange':
      return 'bg-orange border-orange-400 text-gray-dark'
    case 'white':
      return 'bg-gray-50/50 border-gray-200 text-gray-dark'
  }
}

const boxBehavior = (color: 'green' | 'orange' | 'white'): string => {
  switch (color) {
    case 'green':
      return 'hover:bg-green-dark'
    case 'orange':
      return 'hover:bg-orange'
    case 'white':
      return 'hover:bg-gray-100'
  }
}

type DaftarSoalCardProps = {
  listSoal: SoalType[]
  currentSoal: number
  setCurrentSoal(val: number): void
}

export default function DaftarSoalCard({
  listSoal,
  currentSoal,
  setCurrentSoal,
}: DaftarSoalCardProps) {
  return (
    <Card className="flex flex-col p-0">
      <Text weight="semibold" variant="dark" className="mx-3 my-2">
        Daftar Soal
      </Text>
      <CardSeparator />
      <div className="flex flex-col space-y-3 p-3">
        <div className="flex gap-x-2">
          <div className="flex flex-col items-center flex-1 bg-slight-blue rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Jumlah soal
            </Text>
            <Text weight="semibold" variant="dark">
              21
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-green rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Sudah dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              18
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-red rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Belum dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              4
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-2 xl:grid-cols-5">
          {listSoal.map((soal, idx) => {
            const color =
              idx === currentSoal ? 'orange' : soal.jawab ? 'green' : 'white'

            return (
              <div className="flex justify-center items-center" key={idx}>
                <Button
                  size="sm"
                  className={cn(
                    'size-8 border',
                    boxColor(color),
                    boxBehavior(color)
                  )}
                  disabled={idx === currentSoal}
                  onClick={() => setCurrentSoal(idx)}
                >
                  {idx + 1}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
      <CardSeparator />
      <div className="flex flex-wrap gap-x-3 gap-y-1 px-3 py-1">
        <div className="flex space-x-1">
          <div
            className={cn('size-3 border rounded-sm', boxColor('green'))}
          ></div>
          <Text size="2xs" weight="medium" variant="dark">
            Terjawab
          </Text>
        </div>
        <div className="flex space-x-1">
          <div
            className={cn('size-3 border rounded-sm', boxColor('orange'))}
          ></div>
          <Text size="2xs" weight="medium" variant="dark">
            Dikerjakan
          </Text>
        </div>
        <div className="flex space-x-1">
          <div
            className={cn('size-3 border rounded-sm', boxColor('white'))}
          ></div>
          <Text size="2xs" weight="medium" variant="dark">
            Belum dikerjakan
          </Text>
        </div>
      </div>
    </Card>
  )
}
