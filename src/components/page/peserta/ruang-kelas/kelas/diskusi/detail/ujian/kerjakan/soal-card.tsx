import { Button, Card, CardSeparator, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { JawabanType, SoalType } from './ujian-body'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { Radio } from 'rizzui'

const poinJawaban: JawabanType[] = ['A', 'B', 'C', 'D', 'E', 'F']

type SoalCardProps = {
  soal: SoalType
  currentSoal: number
  setCurrentSoal(val: number): void
  totalSoal: number
  onChangeJawaban?(val: JawabanType): void
}

export default function SoalCard({
  soal,
  currentSoal,
  setCurrentSoal,
  totalSoal,
  onChangeJawaban,
}: SoalCardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const soalKe = currentSoal + 1

  return (
    <Card className="flex flex-col p-0">
      <Text weight="semibold" variant="dark" className="mx-3 my-2">
        Soal {soalKe} dari {totalSoal}
      </Text>
      <CardSeparator />
      <div className="flex flex-col items-start space-y-2 px-3 py-2">
        {isClient ? (
          <>
            <div className="text-sm text-gray-dark font-medium">
              <SanitizeHTML html={soal.soal} />
            </div>
            {soal.jawaban.map((item, idx) => (
              <label className="flex space-x-2 cursor-pointer" key={idx}>
                <Radio
                  className="[&_.rizzui-radio-field]:cursor-pointer"
                  name="jawaban"
                  value={poinJawaban[idx] ?? 'A'}
                  checked={soal.jawab === poinJawaban[idx]}
                  onChange={() =>
                    onChangeJawaban && onChangeJawaban(poinJawaban[idx])
                  }
                />
                <SanitizeHTML html={item} />
              </label>
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center w-full min-h-28">
            <CgSpinner size={24} className="animate-spin text-primary" />
          </div>
        )}
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
