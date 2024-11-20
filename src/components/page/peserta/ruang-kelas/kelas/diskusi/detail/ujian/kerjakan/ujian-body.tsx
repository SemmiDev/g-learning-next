'use client'

import { routes } from '@/config/routes'
import { useRouter } from 'next-nprogress-bar'
import { useEffect, useState } from 'react'
import useMedia from 'react-use/lib/useMedia'
import SelesaiUjianModal from '../modal/selesai-ujian'
import DaftarSoalCard from './daftar-soal-card'
import JudulSoalCard from './judul-soal-card'
import SisaWaktuCard from './sisa-waktu-card'
import SoalCard from './soal-card'

export type JawabanType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null

export type SoalType = {
  soal: string
  jawaban: string[]
  jawab?: JawabanType
}

export default function KerjakanUjianBody() {
  const isMediumScreen = useMedia('(min-width: 1280px)', true)
  const router = useRouter()

  const [currentSoal, setCurrentSoal] = useState(0)
  const [listSoal, setListSoal] = useState<SoalType[]>([])
  const [showModalSelesai, setShowModalSelesai] = useState(false)

  useEffect(() => {
    const dataSoal: SoalType[] = [...Array(20)].map((_, idx) => ({
      soal: '<p>Mana di bawah ini yg bukan kucing air?</p>',
      jawaban: [
        'https://drive.google.com/thumbnail?id=1_oj7fIKLj7W_sjbZdLv0uO_U8E3ccCcu&sz=s500',
        'https://drive.google.com/thumbnail?id=1509yaRkJZTZp12idOWEkg1C3pICPkB3k&sz=s500',
        'https://drive.google.com/thumbnail?id=1QvXq2iX9H9x4Zy9aJADlLeuqeSS0attF&sz=s500',
        'https://drive.google.com/thumbnail?id=1EOJDtVpGt2UMH1DjV9v4-U6yaTcGKzp7&sz=s500',
      ].map(
        (val) => `<p><img src="${val}" referrerpolicy="no-referrer" /></p>`
      ),
      jawab: idx < 18 ? 'A' : null,
    }))
    setListSoal(dataSoal)
  }, [])

  const setJawaban = (jawaban: JawabanType) => {
    const dataSoal = [...listSoal]
    dataSoal[currentSoal].jawab = jawaban

    setListSoal(dataSoal)
  }

  const onShowModalSelesai = () => {
    setShowModalSelesai(true)
  }

  return (
    <>
      <div className="flex flex-col gap-8 w-full xl:w-1/4">
        {!isMediumScreen && (
          <JudulSoalCard onSelesaiUjian={onShowModalSelesai} />
        )}
        <SisaWaktuCard />
        <DaftarSoalCard
          listSoal={listSoal}
          currentSoal={currentSoal}
          setCurrentSoal={setCurrentSoal}
        />
      </div>
      <div className="flex flex-col gap-y-8 flex-1">
        {isMediumScreen && (
          <JudulSoalCard onSelesaiUjian={onShowModalSelesai} />
        )}
        <SoalCard
          soal={listSoal[currentSoal]}
          currentSoal={currentSoal}
          setCurrentSoal={setCurrentSoal}
          totalSoal={listSoal.length}
          onChangeJawaban={(val) => setJawaban(val)}
        />
      </div>

      <SelesaiUjianModal
        showModal={showModalSelesai}
        setShowModal={setShowModalSelesai}
        onSelesaiUjian={() => {
          setShowModalSelesai(false)
          router.replace(`${routes.peserta.kelas}/diskusi/detail/ujian/selesai`)
        }}
      />
    </>
  )
}
