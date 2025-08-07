'use client'

import { Card, CardSeparator, Shimmer } from '@/components/ui'
import { PILIHAN_JAWABAN } from '@/config/const'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatBankSoalApi } from '@/services/api/pengguna/bank-soal/lihat'
import { dataPreviewSoalApi } from '@/services/api/pengguna/bank-soal/soal/preview/data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useWindowScroll } from 'react-use'
import useMedia from 'react-use/lib/useMedia'
import { generate } from 'short-uuid'
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

export default function PreviewSoalBody() {
  const { makeSimpleApiQueryData, processApi } = useSessionJwt()
  const { y: scrollY } = useWindowScroll()
  const isMediumScreen = useMedia('(min-width: 768px)', true)

  const [seedAcakPilihan, setSeedAcakPilihan] = useState<string>()
  const [currentTipe, setCurrentTipe] = useState<TipeSoal>('single-choice')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [listSoalPilihan, setListSoalPilihan] = useState<SoalType[]>([])
  const [listSoalEsai, setListSoalEsai] = useState<SoalType[]>([])

  const {
    kategori: idKategori,
    soal: idBankSoal,
  }: { kategori: string; soal: string } = useParams()

  const { data: dataBankSoal, isLoading: isLoadingBankSoal } = useQuery({
    queryKey: ['pengguna.bank-soal.lihat', idKategori, idBankSoal],
    queryFn: makeSimpleApiQueryData(lihatBankSoalApi, idKategori, idBankSoal),
  })

  const fetchData = async () => {
    const { data } = await processApi(dataPreviewSoalApi, idBankSoal)

    setListSoalPilihan(
      (data?.list ?? [])
        .filter((item) => item.tipe === 'PILIHAN_GANDA')
        .map((item) => ({
          id: item.id,
          tipe: 'single-choice',
          soal: item.pertanyaan,
          jawaban: PILIHAN_JAWABAN.map((pilihan) => ({
            pilihan,
            teks: item[`jawaban_${pilihan.toLowerCase() as JawabanTypeLower}`],
          })),
          jawab: null,
        }))
    )

    setListSoalEsai(
      (data?.list ?? [])
        .filter((item) => item.tipe === 'ESSAY')
        .map((item) => ({
          id: item.id,
          tipe: 'essay',
          soal: item.pertanyaan,
          jawab: null,
        }))
    )
  }

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
    setSeedAcakPilihan(generate())
  }, [])

  const showFixedNavBar = useMemo(() => scrollY >= 162, [scrollY])

  if (isLoadingBankSoal) return <BodyShimmer />

  return (
    <>
      <div className="flex flex-col gap-2 py-2 px-2 md:gap-4 md:px-10 md:py-6 lg:px-20 xl:gap-6 xl:px-40">
        <div className="flex flex-col-reverse items-start gap-2 md:gap-4 lg:flex-row xl:gap-6">
          <FixedNavbar show={showFixedNavBar} />
          <SisaWaktuCard className="w-full lg:w-[30%] xl:w-1/4" />
          <JudulSoalCard
            judul={dataBankSoal?.judul ?? ''}
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
            seedAcakPilihan={seedAcakPilihan}
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
