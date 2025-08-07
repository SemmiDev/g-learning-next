import { ActionIcon, Button, CardSeparator, Text } from '@/components/ui'
import { useGlobalStore } from '@/stores/global'
import cn from '@/utils/class-names'
import { MdOutlineClose } from 'react-icons/md'
import { SoalType, TipeSoal } from './body'

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
      return 'hover:bg-success-dark'
    case 'orange':
      return 'hover:bg-warning'
    case 'white':
      return 'hover:bg-gray-100'
  }
}

export type DaftarSoalProps = {
  listSoalPilihan: SoalType[]
  listSoalEsai: SoalType[]
  totalSoal: number
  jumlahTerjawab: number
  currentTipe: TipeSoal
  setCurrentTipe(val: TipeSoal): void
  currentIdx: number
  setCurrentIdx(val: number): void
  bigger?: boolean
}

export default function DaftarSoal({
  listSoalPilihan,
  listSoalEsai,
  totalSoal,
  jumlahTerjawab,
  currentTipe,
  setCurrentTipe,
  currentIdx,
  setCurrentIdx,
  bigger,
}: DaftarSoalProps) {
  const { setOpenSidebarMenu } = useGlobalStore()

  const belum = totalSoal - jumlahTerjawab

  return (
    <>
      <div className="flex justify-between items-center gap-x-2 px-3 py-2">
        <Text weight="semibold" variant="dark">
          Daftar Soal
        </Text>
        {bigger && (
          <ActionIcon
            size="sm"
            variant="outline"
            color="gray"
            onClick={() => setOpenSidebarMenu(false)}
          >
            <MdOutlineClose />
          </ActionIcon>
        )}
      </div>
      <CardSeparator />
      <div className="flex flex-col">
        <div className="flex gap-x-2 px-3 pt-3 pb-4">
          <div className="flex flex-col items-center flex-1 bg-slight-blue rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Jumlah soal
            </Text>
            <Text weight="semibold" variant="dark">
              {totalSoal}
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-green rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Sudah dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              {jumlahTerjawab}
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-red rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Belum dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              {belum}
            </Text>
          </div>
        </div>
        <Text size="sm" weight="semibold" variant="dark" className="px-3">
          Pilihan Ganda
        </Text>
        <div
          className={cn(
            'grid grid-cols-5 gap-2 p-3 overflow-auto max-h-[calc(100dvh-160px)]',
            {
              'grid-cols-10': bigger,
            }
          )}
        >
          {listSoalPilihan.map((soal, idx) => {
            const color =
              currentTipe === 'single-choice' && idx === currentIdx
                ? 'orange'
                : soal.jawab
                ? 'green'
                : 'white'

            return (
              <div className="flex justify-center items-center" key={idx}>
                <Button
                  size="sm"
                  className={cn(
                    'size-8 border',
                    boxColor(color),
                    boxBehavior(color)
                  )}
                  disabled={
                    currentTipe === 'single-choice' && idx === currentIdx
                  }
                  onClick={() => {
                    setCurrentTipe('single-choice')
                    setCurrentIdx(idx)
                    setOpenSidebarMenu(false)
                  }}
                >
                  {idx + 1}
                </Button>
              </div>
            )
          })}
        </div>
        <Text size="sm" weight="semibold" variant="dark" className="px-3 mt-2">
          Esai
        </Text>
        <div
          className={cn(
            'grid grid-cols-5 gap-2 p-3 overflow-auto max-h-[calc(100dvh-160px)]',
            {
              'grid-cols-10': bigger,
            }
          )}
        >
          {listSoalEsai.map((soal, idx) => {
            const color =
              currentTipe === 'essay' && idx === currentIdx
                ? 'orange'
                : soal.jawab
                ? 'green'
                : 'white'

            return (
              <div className="flex justify-center items-center" key={idx}>
                <Button
                  size="sm"
                  className={cn(
                    'size-8 border',
                    boxColor(color),
                    boxBehavior(color)
                  )}
                  disabled={currentTipe === 'essay' && idx === currentIdx}
                  onClick={() => {
                    setCurrentTipe('essay')
                    setCurrentIdx(idx)
                    setOpenSidebarMenu(false)
                  }}
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
        <div className="flex gap-x-1">
          <div
            className={cn('size-3 border rounded-sm', boxColor('green'))}
          ></div>
          <Text size="2xs" weight="medium" variant="dark">
            Terjawab
          </Text>
        </div>
        <div className="flex gap-x-1">
          <div
            className={cn('size-3 border rounded-sm', boxColor('orange'))}
          ></div>
          <Text size="2xs" weight="medium" variant="dark">
            Dikerjakan
          </Text>
        </div>
        <div className="flex gap-x-1">
          <div
            className={cn('size-3 border rounded-sm', boxColor('white'))}
          ></div>
          <Text size="2xs" weight="medium" variant="dark">
            Belum dikerjakan
          </Text>
        </div>
      </div>
    </>
  )
}
