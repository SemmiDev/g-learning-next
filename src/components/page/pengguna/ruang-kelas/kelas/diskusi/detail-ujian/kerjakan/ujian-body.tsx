'use client'

import { dataUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/data'
import { selesaiUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/selesai-ujian'
import { simpanJawabanAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/simpan-jawaban'
import { PILIHAN_JAWABAN } from '@/config/const'
import { routes } from '@/config/routes'
import { handleActionWithToast } from '@/utils/action'
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
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [saved, setSaved] = useState(false)
  const [targetWaktu, setTargetWaktu] = useState<number>()
  const [sisaWaktu, setSisaWaktu] = useState<number>()
  const [currentSoal, setCurrentSoal] = useState(0)
  const [listSoal, setListSoal] = useState<SoalType[]>([])
  const [showSelesai, setShowSelesai] = useState(false)

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const fetchData = async () => {
    const { data } = await dataUjianAction(idKelas, id)

    setUjian({
      judul: data?.aktifitas.judul,
      durasi: data?.aktifitas.durasi_ujian,
    })

    const sisaWaktu = data?.sisa_durasi || 0

    setTargetWaktu(Math.floor(Date.now() / 1000) + sisaWaktu)

    setSisaWaktu(sisaWaktu)

    setSaved(true)

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

  const setJawaban = async (jawaban: JawabanType) => {
    const dataSoal = [...listSoal]
    dataSoal[currentSoal].jawab = jawaban

    setListSoal(dataSoal)

    if (sisaWaktu !== undefined) {
      setSaved(false)

      await simpanJawabanAction(idKelas, id, {
        jawaban: dataSoal.map((item) => ({
          id: item.id,
          jw: item.jawab || '',
        })),
        durasi: sisaWaktu,
      })

      setSaved(true)
    }
  }

  const processSelesaiUjian = async (sisa: number) => {
    clearInterval(timer)

    await handleActionWithToast(
      selesaiUjianAction(idKelas, id, {
        jawaban: listSoal.map((item) => ({
          id: item.id,
          jw: item.jawab || '',
        })),
        durasi: sisa || 0,
      }),
      {
        loading: 'Menyelesaikan ujian...',
        success: 'Ujian selesai',
        onStart: () => setSaved(false),
        onSuccess: () => {
          setSaved(true)
          router.replace(
            `${routes.pengguna.ruangKelas}/${idKelas}/ujian/${id}/selesai`
          )
        },
      }
    )
  }

  const handleSelesaiUjian = () => {
    setShowSelesai(false)
    processSelesaiUjian(sisaWaktu || 0)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (targetWaktu !== undefined) {
      const newTimer = setInterval(() => {
        const sisa = targetWaktu - Math.floor(Date.now() / 1000)
        if (sisa <= 0) {
          processSelesaiUjian(0)
        }

        setSisaWaktu(sisa)
      }, 1000)

      setTimer(newTimer)

      return () => clearInterval(newTimer)
    }
  }, [targetWaktu])

  return (
    <>
      <div className="flex flex-col gap-4 py-2 px-2 md:px-10 md:py-6 lg:px-20 xl:gap-6 xl:px-40">
        <div className="flex flex-col-reverse items-start gap-4 lg:flex-row xl:gap-6">
          <SisaWaktuCard
            sisaWaktu={sisaWaktu}
            className="w-full lg:w-[30%] xl:w-1/4"
          />
          <JudulSoalCard
            judul={ujian?.judul ?? ''}
            durasi={ujian?.durasi ?? 0}
            onSelesaiUjian={() => setShowSelesai(true)}
            saved={saved}
            className="w-full lg:w-auto lg:flex-1"
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
        onSelesaiUjian={handleSelesaiUjian}
      />

      <DrawerDaftarSoal
        listSoal={listSoal}
        currentSoal={currentSoal}
        setCurrentSoal={setCurrentSoal}
      />
    </>
  )
}
