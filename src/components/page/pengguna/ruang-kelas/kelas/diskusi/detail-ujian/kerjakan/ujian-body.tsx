'use client'

import { dataUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/data'
import { PILIHAN_JAWABAN } from '@/config/const'
import { routes } from '@/config/routes'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useMedia from 'react-use/lib/useMedia'
import SelesaiUjianModal from '../modal/selesai-ujian'
import DaftarSoalCard from './daftar-soal-card'
import DrawerDaftarSoal from './daftar-soal-drawer'
import JudulSoalCard from './judul-soal-card'
import SisaWaktuCard from './sisa-waktu-card'
import SoalCard from './soal-card'

type JawabanType = (typeof PILIHAN_JAWABAN)[number]
type JawabanTypeLower = Lowercase<JawabanType>

export type SoalType = {
  id: string
  soal: string
  jawaban: {
    pilihan: JawabanType
    teks: string
  }[]
  jawab?: JawabanType | null
}

export default function KerjakanUjianBody() {
  const router = useRouter()
  const isMediumScreen = useMedia('(min-width: 768px)', true)
  const [ujian, setUjian] = useState<{
    judul?: string
    durasi?: number
  }>()
  const [sisaWaktu, setSisaWaktu] = useState<number>()
  const [currentSoal, setCurrentSoal] = useState(0)
  const [listSoal, setListSoal] = useState<SoalType[]>([])
  const [showSelesai, setShowSelesai] = useState(false)

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const setJawaban = (jawaban: JawabanType) => {
    const dataSoal = [...listSoal]
    dataSoal[currentSoal].jawab = jawaban

    setListSoal(dataSoal)

    console.log(dataSoal)

    /* TODO: kirim data jawaban ke API */
  }

  const fetchData = async () => {
    const { data } = await dataUjianAction(idKelas, id)

    setUjian({
      judul: data?.aktifitas.judul,
      durasi: data?.aktifitas.durasi_ujian,
    })

    setSisaWaktu(data?.sisa_durasi)

    setListSoal(
      (data?.soal ?? []).map((item) => ({
        id: item.id,
        soal: item.soal,
        jawaban: PILIHAN_JAWABAN.map((pilihan) => ({
          pilihan,
          teks: item[`jawaban_${pilihan.toLowerCase() as JawabanTypeLower}`],
        })),
        jawab: item.jawaban_anda || null,
      }))
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (sisaWaktu && sisaWaktu > 0) {
      const timer = setTimeout(() => setSisaWaktu(sisaWaktu - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [sisaWaktu])

  const onShowModalSelesai = () => {
    setShowSelesai(true)
  }

  return (
    <>
      <div className="flex flex-col gap-4 py-6 px-2 md:px-10 lg:px-20 xl:gap-6 xl:px-40">
        <div className="flex gap-4 xl:gap-6">
          <SisaWaktuCard sisaWaktu={sisaWaktu} className="w-[30%] xl:w-1/4" />
          <JudulSoalCard
            judul={ujian?.judul ?? ''}
            durasi={ujian?.durasi ?? 0}
            onSelesaiUjian={onShowModalSelesai}
            className="flex-1"
          />
        </div>
        <div className="flex items-start flex-wrap gap-4 xl:gap-6">
          {isMediumScreen && (
            <DaftarSoalCard
              listSoal={listSoal}
              currentSoal={currentSoal}
              setCurrentSoal={setCurrentSoal}
              className="w-full hidden lg:w-[30%] xl:w-1/4 lg:flex"
            />
          )}
          <SoalCard
            soal={listSoal[currentSoal]}
            currentSoal={currentSoal}
            setCurrentSoal={setCurrentSoal}
            totalSoal={listSoal.length}
            onChangeJawaban={(val) => setJawaban(val)}
            className="flex-1"
          />
        </div>
      </div>

      <SelesaiUjianModal
        show={showSelesai}
        setShow={setShowSelesai}
        listSoal={listSoal}
        onSelesaiUjian={() => {
          setShowSelesai(false)
          router.replace(`${routes.peserta.kelas}/diskusi/detail/ujian/selesai`)
        }}
      />

      <DrawerDaftarSoal
        listSoal={listSoal}
        currentSoal={currentSoal}
        setCurrentSoal={setCurrentSoal}
      />
    </>
  )
}
