import { Button, Card, CardSeparator, Text } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { PILIHAN_JAWABAN } from '@/config/const'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import cn from '@/utils/class-names'
import { shuffleListWithSeed } from '@/utils/list'
import { stripHtml } from '@/utils/text'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { Radio } from 'rizzui'
import { SoalType, TipeSoal } from './ujian-body'

const QuillEditor = dynamic(() => import('@/components/ui/quill'), {
  ssr: false,
})

type JawabanType = (typeof PILIHAN_JAWABAN)[number]

type SoalCardProps = {
  soal: SoalType | undefined
  totalSoal: number
  totalSoalPilihan: number
  currentTipe: TipeSoal
  setCurrentTipe(val: TipeSoal): void
  currentIdx: number
  setCurrentIdx(val: number): void
  acakPilihan: boolean
  onChangeJawaban?(val: JawabanType | string): void
  className?: string
}

export default function SoalCard({
  soal,
  totalSoal,
  totalSoalPilihan,
  currentTipe,
  setCurrentTipe,
  currentIdx,
  setCurrentIdx,
  acakPilihan,
  onChangeJawaban,
  className,
}: SoalCardProps) {
  const { id: idPengguna } = useSessionPengguna()

  const soalKe = currentIdx + 1

  const showPrev = !(currentTipe === 'single-choice' && soalKe === 1)
  const showNext = !(currentTipe === 'essay' && soalKe === totalSoal)

  const handlePrev = () => {
    if (currentTipe === 'essay' && currentIdx === 0) {
      setCurrentTipe('single-choice')
      setCurrentIdx(totalSoalPilihan - 1)
    } else {
      setCurrentIdx(currentIdx - 1)
    }
  }

  const handleNext = () => {
    if (
      currentTipe === 'single-choice' &&
      currentIdx === totalSoalPilihan - 1
    ) {
      setCurrentTipe('essay')
      setCurrentIdx(0)
    } else {
      setCurrentIdx(currentIdx + 1)
    }
  }

  const pilihanJawaban = useMemo(
    () =>
      acakPilihan
        ? shuffleListWithSeed(
            (soal?.jawaban ?? []).filter((item) => !!item.teks),
            idPengguna
          )
        : (soal?.jawaban ?? []).filter((item) => !!item.teks),
    [soal]
  )

  if (!soal) return null

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex justify-between gap-x-2 px-3 py-2">
        <Text weight="semibold" variant="dark">
          Soal {soalKe} dari {totalSoal}
        </Text>
        <Text weight="semibold" variant="dark">
          Soal {currentTipe === 'single-choice' ? 'Pilihan Ganda' : 'Esai'}
        </Text>
      </div>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 select-none py-2 [&_img]:max-h-fit">
        <SanitizeHTML
          html={soal.soal}
          className="text-sm text-gray-dark font-medium [&_*]:!cursor-default !px-3"
        />
        {soal.tipe === 'single-choice' ? (
          <div>
            {pilihanJawaban.map((item) => (
              <label
                key={item.pilihan}
                className="flex gap-x-2 flex-1 cursor-pointer py-2 px-3 hover:bg-green-50 [&_*]:!cursor-pointer"
              >
                <Radio
                  name="jawaban"
                  value={item.pilihan}
                  checked={soal.jawab === item.pilihan}
                  onChange={() =>
                    onChangeJawaban && onChangeJawaban(item.pilihan)
                  }
                />
                <SanitizeHTML html={item.teks} />
              </label>
            ))}
          </div>
        ) : (
          <QuillEditor
            size="md"
            placeholder="Ketik jawaban kamu di sini"
            toolbar="minimalist"
            value={soal.jawab ?? undefined}
            onChange={(val, _, src) => {
              src === 'user' &&
                onChangeJawaban &&
                onChangeJawaban(stripHtml(val))
            }}
            className="px-1 py-1"
          />
        )}
      </div>
      <CardSeparator />
      <div
        className={cn('flex px-3 py-2', {
          'justify-between': showPrev,
          'justify-end': !showPrev,
        })}
      >
        {showPrev && (
          <Button size="sm" onClick={handlePrev}>
            Soal Sebelumnya
          </Button>
        )}
        {showNext && (
          <Button size="sm" onClick={handleNext}>
            Soal Berikutnya
          </Button>
        )}
      </div>
    </Card>
  )
}
