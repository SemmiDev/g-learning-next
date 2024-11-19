import { ActionIcon, Button, CardSeparator, Text } from '@/components/ui'
import { useGlobalStore } from '@/stores/global'
import cn from '@/utils/class-names'
import { MdOutlineClose } from 'react-icons/md'
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
      return 'hover:bg-success-dark'
    case 'orange':
      return 'hover:bg-warning'
    case 'white':
      return 'hover:bg-gray-100'
  }
}

export type DaftarSoalProps = {
  listSoal: SoalType[]
  currentSoal: number
  setCurrentSoal(val: number): void
  bigger?: boolean
}

export default function DaftarSoal({
  listSoal,
  currentSoal,
  setCurrentSoal,
  bigger,
}: DaftarSoalProps) {
  const { setOpenSidebarMenu } = useGlobalStore()

  const total = listSoal.length
  const dijawab = listSoal.filter((item) => !!item.jawab).length
  const belum = total - dijawab

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
      <div className="flex flex-col space-y-3 p-3">
        <div className="flex gap-x-2">
          <div className="flex flex-col items-center flex-1 bg-slight-blue rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Jumlah soal
            </Text>
            <Text weight="semibold" variant="dark">
              {total}
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-green rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Sudah dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              {dijawab}
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
        <div
          className={cn('grid grid-cols-5 gap-2', { 'grid-cols-10': bigger })}
        >
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
                  onClick={() => {
                    setCurrentSoal(idx)
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
    </>
  )
}
