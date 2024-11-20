'use client'

import { dataUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/data'
import { selesaiUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/selesai-ujian'
import { simpanJawabanAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/simpan-jawaban'
import { Card, CardSeparator, Shimmer } from '@/components/ui'
import { PILIHAN_JAWABAN } from '@/config/const'
import { routes } from '@/config/routes'
import { handleActionWithToast } from '@/utils/action'
import { useRouter } from 'next-nprogress-bar'
import { useParams } from 'next/navigation'
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
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error'>()
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

    setSaveStatus('saved')

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

  const simpanJawaban = async (dataSoal: SoalType[]) => {
    if (sisaWaktu === undefined) return

    try {
      await simpanJawabanAction(idKelas, id, {
        jawaban: dataSoal.map((item) => ({
          id: item.id,
          jw: item.jawab || '',
        })),
        durasi: sisaWaktu,
      })

      setSaveStatus('saved')
    } catch (error) {
      setSaveStatus('error')
    }
  }

  const setJawaban = async (jawaban: JawabanType) => {
    const dataSoal = [...listSoal]
    dataSoal[currentSoal].jawab = jawaban

    setListSoal(dataSoal)
    setSaveStatus('saving')

    simpanJawaban(dataSoal)
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
        onStart: () => setSaveStatus('saving'),
        onSuccess: () => {
          setSaveStatus('saved')
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
      const newTimer = setTimeout(() => {
        const sisa = targetWaktu - Math.floor(Date.now() / 1000)

        if (sisa <= 0) {
          processSelesaiUjian(0)
        } else if (saveStatus === 'error' && sisa % 5 === 0) {
          simpanJawaban(listSoal)
        }

        setSisaWaktu(sisa)
      }, 1000)

      setTimer(newTimer)

      return () => clearInterval(newTimer)
    }
  }, [targetWaktu, sisaWaktu])

  if (!ujian) return <ShimmerBody />

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
            saved={saveStatus === 'saved'}
            className="w-full lg:w-auto lg:flex-1"
          />
        </div>
        <div className="flex items-start flex-wrap gap-4 xl:gap-6">
          {isMediumScreen && (
            <DaftarSoalCard
              listSoal={listSoal}
              currentSoal={currentSoal}
              setCurrentSoal={setCurrentSoal}
              className="w-full hidden lg:flex lg:w-[30%] xl:w-1/4"
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

function ShimmerBody() {
  return (
    <div className="flex flex-col gap-4 py-2 px-2 md:px-10 md:py-6 lg:px-20 xl:gap-6 xl:px-40">
      <div className="flex flex-col-reverse items-start gap-4 lg:flex-row xl:gap-6">
        <Card className="flex flex-col w-full p-0 lg:w-[30%] xl:w-1/4">
          <div className="px-3 py-3">
            <Shimmer className="h-4 w-8/12" />
          </div>
          <CardSeparator />
          <div className="px-3 py-3">
            <Shimmer className="h-4 w-1/3" />
          </div>
        </Card>
        <Card className="flex justify-between items-center gap-2 w-full px-4 py-3.5 lg:w-auto lg:flex-1">
          <div className="flex flex-col flex-1">
            <div className="w-full py-1.5">
              <Shimmer className="h-5 w-10/12 lg:w-7/12" />
            </div>
            <div className="w-full py-1.5">
              <Shimmer className="h-2.5 w-1/2 lg:w-1/4" />
            </div>
          </div>
          <Shimmer className="h-8 w-24" />
        </Card>
      </div>
      <div className="flex items-start flex-wrap gap-4 xl:gap-6">
        <Card className="flex-col sticky top-5 p-0 w-full hidden lg:flex lg:w-[30%] xl:w-1/4">
          <div className="px-3 py-3">
            <Shimmer className="h-4 w-4/12" />
          </div>
          <CardSeparator />
          <div className="flex flex-col space-y-3 p-3">
            <div className="flex gap-x-2">
              <Shimmer className="h-16 flex-1" />
              <Shimmer className="h-16 flex-1" />
              <Shimmer className="h-16 flex-1" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(10)].map((_, idx) => (
                <div key={idx} className="flex justify-center items-center">
                  <Shimmer className="size-8" />
                </div>
              ))}
            </div>
          </div>
          <CardSeparator />
          <div className="flex flex-wrap gap-x-3 gap-y-1 px-3 py-1">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                <Shimmer className="size-3 rounded-sm" />
                <Shimmer className="h-2 w-14" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <div className="px-3 py-3">
            <Shimmer className="h-4 w-4/12" />
          </div>
          <CardSeparator />
          <div className="flex flex-col gap-y-4 px-3 py-3.5">
            <div className="flex flex-col gap-y-2">
              <Shimmer className="h-2.5 w-full" />
              <Shimmer className="h-2.5 w-full" />
              <Shimmer className="h-2.5 w-8/12" />
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center space-x-2 w-4/12">
                <Shimmer className="h-6 w-6 rounded-full" />
                <Shimmer className="h-2.5 flex-1" />
              </div>
              <div className="flex items-center space-x-2 w-6/12">
                <Shimmer className="h-6 w-6 rounded-full" />
                <Shimmer className="h-2.5 flex-1" />
              </div>
              <div className="flex items-center space-x-2 w-3/12">
                <Shimmer className="h-6 w-6 rounded-full" />
                <Shimmer className="h-2.5 flex-1" />
              </div>
              <div className="flex items-center space-x-2 w-5/12">
                <Shimmer className="h-6 w-6 rounded-full" />
                <Shimmer className="h-2.5 flex-1" />
              </div>
            </div>
          </div>
          <CardSeparator />
          <div className="flex justify-end px-3 py-2">
            <Shimmer className="h-8 w-28" />
          </div>
        </Card>
      </div>
    </div>
  )
}
