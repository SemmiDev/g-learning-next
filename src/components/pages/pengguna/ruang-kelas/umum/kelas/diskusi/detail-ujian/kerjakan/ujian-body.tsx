'use client'

import { Card, CardSeparator, Shimmer } from '@/components/ui'
import { PILIHAN_JAWABAN } from '@/config/const'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { dataUjianApi } from '@/services/api/pengguna/ruang-kelas/ujian/peserta/data'
import { selesaiUjianApi } from '@/services/api/pengguna/ruang-kelas/ujian/peserta/selesai-ujian'
import { simpanJawabanApi } from '@/services/api/pengguna/ruang-kelas/ujian/peserta/simpan-jawaban'
import { handleActionWithToast } from '@/utils/action'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce, useWindowScroll } from 'react-use'
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
  jawab?: string | null
}

export default function KerjakanUjianBody() {
  const { makeSimpleApiQueryData, processApi } = useSessionJwt()
  const router = useRouter()
  const { y: scrollY } = useWindowScroll()
  const isMediumScreen = useMedia('(min-width: 768px)', true)

  const [ujian, setUjian] = useState<{
    judul?: string
    durasi?: number
  }>()
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error'>()
  const [targetWaktu, setTargetWaktu] = useState<number>()
  const [sisaWaktu, setSisaWaktu] = useState<number>()
  const [currentTipe, setCurrentTipe] = useState<TipeSoal>('single-choice')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [listSoalPilihan, setListSoalPilihan] = useState<SoalType[]>([])
  const [listSoalEsai, setListSoalEsai] = useState<SoalType[]>([])
  const [acakPilihan, setAcakPilihan] = useState(false)
  const [showSelesai, setShowSelesai] = useState(false)
  const [typing, setTyping] = useState<string>()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

  const tipeKelas = dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  const fetchData = async () => {
    const { data } = await processApi(dataUjianApi, idKelas, id)

    setUjian({
      judul: data?.aktifitas.judul,
      durasi: data?.aktifitas.durasi_ujian,
    })

    setAcakPilihan(data?.aktifitas.acak_jawaban === 1)

    const sisaWaktu = data?.sisa_durasi || 0

    setTargetWaktu(Math.floor(Date.now() / 1000) + sisaWaktu)

    setSisaWaktu(sisaWaktu)

    setSaveStatus('saved')

    setListSoalPilihan(
      (data?.soal ?? [])
        .filter((item) => item.tipe === 'PILIHAN_GANDA')
        .map((item) => ({
          id: item.id,
          tipe: 'single-choice',
          soal: item.soal,
          jawaban: PILIHAN_JAWABAN.map((pilihan) => ({
            pilihan,
            teks: item[`jawaban_${pilihan.toLowerCase() as JawabanTypeLower}`],
          })),
          jawab: item.jawaban_anda || null,
        }))
    )

    setListSoalEsai(
      (data?.soal ?? [])
        .filter((item) => item.tipe === 'ESSAY')
        .map((item) => ({
          id: item.id,
          tipe: 'essay',
          soal: item.soal,
          jawab: item.jawaban_anda || null,
        }))
    )
  }

  const simpanJawaban = async (dataSoal: SoalType[]) => {
    if (sisaWaktu === undefined) return

    try {
      await processApi(simpanJawabanApi, idKelas, id, {
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

  const setJawabanPilihan = (jawaban: JawabanType) => {
    const dataSoal = [...listSoalPilihan]
    dataSoal[currentIdx].jawab = jawaban

    setListSoalPilihan(dataSoal)
    setSaveStatus('saving')

    simpanJawaban(listSemuaSoal)
  }

  const setJawabanEsai = (jawaban: string) => {
    const dataSoal = [...listSoalEsai]
    dataSoal[currentIdx].jawab = jawaban

    setListSoalEsai(dataSoal)
  }

  // simpan jawaban 3 detik setelah mengetik jawaban
  useDebounce(() => simpanJawaban(listSemuaSoal), typing ? 3000 : 0, [typing])

  const processSelesaiUjian = async (sisa: number) => {
    clearInterval(timer)

    await handleActionWithToast(
      processApi(selesaiUjianApi, idKelas, id, {
        jawaban: listSemuaSoal.map((item) => ({
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
            `${routes.pengguna.ruangKelas.diikuti[tipeKelas]}/${idKelas}/ujian/${id}/selesai`
          )
        },
      }
    )
  }

  const handleSelesaiUjian = () => {
    setShowSelesai(false)
    processSelesaiUjian(sisaWaktu || 0)
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
    [listSemuaSoal]
  )

  const currentSoal = useMemo(
    () => listSoal[currentIdx],
    [listSoal, currentIdx]
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (targetWaktu !== undefined) {
      const newTimer = setTimeout(() => {
        const sisa = targetWaktu - Math.floor(Date.now() / 1000)

        if (sisa <= 0) {
          processSelesaiUjian(0)
        } else if (
          sisa % 30 === 0 ||
          (saveStatus === 'error' && sisa % 5 === 0)
        ) {
          simpanJawaban(listSemuaSoal)
        }

        setSisaWaktu(sisa)
      }, 1000)

      setTimer(newTimer)

      return () => clearInterval(newTimer)
    }
  }, [targetWaktu, sisaWaktu])

  const showFixedNavBar = useMemo(() => scrollY >= 162, [scrollY])

  if (!ujian) return <BodyShimmer />

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
            judul={ujian?.judul ?? ''}
            durasi={ujian?.durasi ?? 0}
            onSelesaiUjian={() => setShowSelesai(true)}
            saved={saveStatus === 'saved'}
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
            acakPilihan={acakPilihan}
            onChangeJawaban={(val) => {
              if (currentTipe === 'single-choice') {
                setJawabanPilihan(val as JawabanType)
              } else {
                setJawabanEsai(val)
                setTyping(val)
              }
            }}
            className="flex-1"
          />
        </div>
      </div>

      <SelesaiUjianModal
        show={showSelesai}
        setShow={setShowSelesai}
        totalSoal={listSemuaSoal.length}
        totalTerjawab={totalTerjawab}
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

function BodyShimmer() {
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
          <div className="flex flex-col gap-y-3 p-3">
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
              <div key={idx} className="flex items-center gap-x-1">
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
              <div className="flex items-center gap-x-2 w-4/12">
                <Shimmer className="h-6 w-6 rounded-full" />
                <Shimmer className="h-2.5 flex-1" />
              </div>
              <div className="flex items-center gap-x-2 w-6/12">
                <Shimmer className="h-6 w-6 rounded-full" />
                <Shimmer className="h-2.5 flex-1" />
              </div>
              <div className="flex items-center gap-x-2 w-3/12">
                <Shimmer className="h-6 w-6 rounded-full" />
                <Shimmer className="h-2.5 flex-1" />
              </div>
              <div className="flex items-center gap-x-2 w-5/12">
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
