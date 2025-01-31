'use client'

import { PILIHAN_JAWABAN } from '@/config/const'
import { routes } from '@/config/routes'
import { useRouter } from 'next-nprogress-bar'
import { useEffect, useMemo, useState } from 'react'
import { useWindowScroll } from 'react-use'
import useMedia from 'react-use/lib/useMedia'
import SelesaiUjianModal from '../modal/selesai-ujian'
import DaftarSoalCard from './daftar-soal-card'
import DrawerDaftarSoal from './daftar-soal-drawer'
import FixedNavbar from './fixed-navbar'
import JudulSoalCard from './judul-soal-card'
import SisaWaktuCard from './sisa-waktu-card'
import SoalCard from './soal-card'

type JawabanType = (typeof PILIHAN_JAWABAN)[number]
type JawabanTypeLower = Lowercase<JawabanType>

export type TipeSoal = 'single-choice' | 'essay'

export type SoalType = {
  id: string
  soal: string
  tipe: TipeSoal
  jawaban?: {
    pilihan: JawabanType
    teks: string
  }[]
  jawab?: JawabanType | string | null
}

export default function KerjakanUjianBody() {
  const router = useRouter()
  const { y: scrollY } = useWindowScroll()
  const isMediumScreen = useMedia('(min-width: 768px)', true)

  const [currentTipe, setCurrentTipe] = useState<TipeSoal>('single-choice')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [listSoalPilihan, setListSoalPilihan] = useState<SoalType[]>([])
  const [listSoalEsai, setListSoalEsai] = useState<SoalType[]>([])
  const [showSelesai, setShowSelesai] = useState(false)

  useEffect(() => {
    const dataSoalPilihan: SoalType[] = [...Array(20)].map((_, idx) => ({
      id: idx.toString(),
      soal: '<p>Mana di bawah ini yg bukan kucing air?</p>',
      tipe: 'single-choice',
      jawaban: [
        'https://drive.google.com/thumbnail?id=1_oj7fIKLj7W_sjbZdLv0uO_U8E3ccCcu&sz=s500',
        'https://drive.google.com/thumbnail?id=1509yaRkJZTZp12idOWEkg1C3pICPkB3k&sz=s500',
        'https://drive.google.com/thumbnail?id=1QvXq2iX9H9x4Zy9aJADlLeuqeSS0attF&sz=s500',
        'https://drive.google.com/thumbnail?id=1EOJDtVpGt2UMH1DjV9v4-U6yaTcGKzp7&sz=s500',
      ].map((val) => ({
        pilihan: PILIHAN_JAWABAN[idx],
        teks: `<p><img src="${val}" referrerpolicy="no-referrer" /></p>`,
      })),
      jawab: idx < 17 ? 'A' : null,
    }))
    setListSoalPilihan(dataSoalPilihan)

    const dataSoalEsai: SoalType[] = [...Array(5)].map((_, idx) => ({
      id: idx.toString(),
      soal: '<p>Sistem terasering adalah suatu sistem yang banyak diterapkan pada lahan perbukitan di Indonesia, apa sebetulnya keuntungan yang bisa dihasilkan dari sistem terasering tersebut? Jelaskanlah dengan singkat!</p>',
      tipe: 'essay',
    }))
    setListSoalEsai(dataSoalEsai)
  }, [])

  const setJawabanPilihan = (jawaban: JawabanType) => {
    const dataSoal = [...listSoalPilihan]
    dataSoal[currentIdx].jawab = jawaban

    setListSoalPilihan(dataSoal)
  }

  const setJawabanEsai = (jawaban: string) => {
    const dataSoal = [...listSoalEsai]
    dataSoal[currentIdx].jawab = jawaban

    setListSoalEsai(dataSoal)
  }

  const handleSelesaiUjian = () => {
    setShowSelesai(false)
    router.replace(`${routes.peserta.kelas}/diskusi/detail/ujian/selesai`)
  }

  const listSoal = useMemo(
    () => (currentTipe === 'single-choice' ? listSoalPilihan : listSoalEsai),
    [currentTipe, listSoalPilihan, listSoalEsai]
  )

  const listSemuaSoal = useMemo(
    () => [...listSoalPilihan, ...listSoalEsai],
    [listSoalPilihan, listSoalEsai]
  )

  const totalTerjawab = useMemo(
    () => listSemuaSoal.filter((item) => !!item.jawab).length,
    [listSoalPilihan, listSoalEsai]
  )

  const currentSoal = useMemo(
    () => listSoal[currentIdx],
    [listSoal, currentIdx]
  )

  const showFixedNavBar = useMemo(() => scrollY >= 162, [scrollY])

  const sisaWaktu = 2721

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [currentIdx, currentTipe])

  return (
    <>
      <div className="flex flex-col gap-2 py-2 px-2 md:gap-4 md:px-10 md:py-6 lg:px-20 xl:gap-6 xl:px-40">
        <div className="flex flex-col-reverse items-start gap-2 md:gap-4 lg:flex-row xl:gap-6">
          <FixedNavbar show={showFixedNavBar} sisaWaktu={sisaWaktu} />
          <SisaWaktuCard
            sisaWaktu={sisaWaktu}
            className="w-full lg:w-[30%] xl:w-1/4"
          />
          <JudulSoalCard
            judul="Judul soal di sini"
            durasi={60}
            onSelesaiUjian={() => setShowSelesai(true)}
            saved={true}
            className="w-full lg:w-auto lg:flex-1"
          />
        </div>
        <div className="flex items-start flex-wrap gap-2 md:gap-4 xl:gap-6">
          {isMediumScreen && (
            <DaftarSoalCard
              listSoalPilihan={listSoalPilihan}
              listSoalEsai={listSoalEsai}
              totalSoal={listSemuaSoal.length}
              jumlahTerjawab={totalTerjawab}
              currentTipe={currentTipe}
              setCurrentTipe={setCurrentTipe}
              currentIdx={currentIdx}
              setCurrentIdx={setCurrentIdx}
              className="w-full hidden lg:flex lg:w-[30%] xl:w-1/4"
            />
          )}
          <SoalCard
            soal={currentSoal}
            totalSoal={listSoal.length}
            totalSoalPilihan={listSoalPilihan.length}
            currentTipe={currentTipe}
            setCurrentTipe={setCurrentTipe}
            currentIdx={currentIdx}
            setCurrentIdx={setCurrentIdx}
            onChangeJawaban={(val) => {
              if (currentTipe === 'single-choice') {
                setJawabanPilihan(val as JawabanType)
              } else {
                setJawabanEsai(val)
              }
            }}
            className="flex-1"
          />
        </div>
      </div>

      <SelesaiUjianModal
        show={showSelesai}
        setShow={setShowSelesai}
        listSoal={listSoal}
        onSelesaiUjian={handleSelesaiUjian}
      />

      <DrawerDaftarSoal
        listSoalPilihan={listSoalPilihan}
        listSoalEsai={listSoalEsai}
        totalSoal={listSemuaSoal.length}
        jumlahTerjawab={totalTerjawab}
        currentTipe={currentTipe}
        setCurrentTipe={setCurrentTipe}
        currentIdx={currentIdx}
        setCurrentIdx={setCurrentIdx}
      />
    </>
  )
}
