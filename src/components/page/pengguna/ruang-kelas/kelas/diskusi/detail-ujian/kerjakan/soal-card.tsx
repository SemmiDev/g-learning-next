import { Button, Card, CardSeparator, Text } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { PILIHAN_JAWABAN } from '@/config/const'
import cn from '@/utils/class-names'
import { Radio } from 'rizzui'
import { SoalType } from './ujian-body'

type JawabanType = (typeof PILIHAN_JAWABAN)[number]

const poinJawaban: JawabanType[] = ['A', 'B', 'C', 'D', 'E']

type SoalCardProps = {
  soal: SoalType | undefined
  currentSoal: number
  setCurrentSoal(val: number): void
  totalSoal: number
  onChangeJawaban?(val: JawabanType): void
  className?: string
}

export default function SoalCard({
  soal,
  currentSoal,
  setCurrentSoal,
  totalSoal,
  onChangeJawaban,
  className,
}: SoalCardProps) {
  const soalKe = currentSoal + 1

  if (!soal) return null

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Text weight="semibold" variant="dark" className="mx-3 my-2">
        Soal {soalKe} dari {totalSoal}
      </Text>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 select-none py-2">
        <SanitizeHTML
          html={soal.soal}
          className="text-sm text-gray-dark font-medium [&_*]:cursor-default !px-3"
        />
        <div>
          {soal.jawaban.map(
            (item, idx) =>
              !!item.teks && (
                <label
                  key={idx}
                  className="flex gap-x-2 flex-1 cursor-pointer py-2 px-3 hover:bg-green-50 [&_*]:cursor-pointer"
                >
                  <Radio
                    name="jawaban"
                    value={poinJawaban[idx] ?? 'A'}
                    checked={soal.jawab === poinJawaban[idx]}
                    onChange={() =>
                      onChangeJawaban && onChangeJawaban(poinJawaban[idx])
                    }
                  />
                  <SanitizeHTML html={item.teks} />
                </label>
              )
          )}
        </div>
      </div>
      <CardSeparator />
      <div
        className={cn('flex px-3 py-2', {
          'justify-between': soalKe > 1,
          'justify-end': soalKe === 1,
        })}
      >
        {soalKe > 1 && (
          <Button size="sm" onClick={() => setCurrentSoal(currentSoal - 1)}>
            Soal Sebelumnya
          </Button>
        )}
        {soalKe < totalSoal && (
          <Button size="sm" onClick={() => setCurrentSoal(currentSoal + 1)}>
            Soal Berikutnya
          </Button>
        )}
      </div>
    </Card>
  )
}
