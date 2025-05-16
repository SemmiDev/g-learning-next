'use client'

import { Camera, Map } from '@/components/shared/absen'
import {
  Button,
  ButtonSubmit,
  Card,
  CardSeparator,
  Loader,
  Text,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { presensiSesiQrAction } from '@/services/actions/pengguna/ruang-kelas/sesi-pembelajaran/peserta/presensi-sesi'
import { lihatSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { presensiSesiNonQrApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/peserta/presensi-sesi'
import { handleActionWithToast } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { LatLng } from 'leaflet'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function PresensiSesiBody() {
  const { makeSimpleApiQueryData, processApi } = useSessionJwt()
  const router = useRouter()

  const [position, setPosition] = useState<LatLng>()
  const [photo, setPhoto] = useState<File>()
  const [isSending, setIsSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const absensiRef = useRef<HTMLDivElement>(null)

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
    'pengajar',
    idSesi,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleApiQueryData(lihatSesiPembelajaranApi, idKelas, idSesi),
  })

  const tipe = mustBe(
    data?.jenis_absensi_peserta,
    ['GPS', 'Swafoto', 'GPS dan Swafoto', 'QR Code'] as const,
    undefined
  )

  const handleAbsensiNonQr = async () => {
    const form = new FormData()

    if (position) {
      form.append('latitude', position.lat.toString())
      form.append('longitude', position.lng.toString())
    }

    if (photo) form.append('swafoto', photo)

    await handleActionWithToast(
      processApi(presensiSesiNonQrApi, idKelas, idSesi, form),
      {
        loading: 'Presensi sesi...',
        onStart: () => setIsSending(true),
        onSuccess: () => {
          setSuccess(true)
          router.replace(
            `${routes.pengguna.ruangKelas.diikuti.akademik}/${idKelas}/sesi-pembelajaran/${idSesi}`
          )
        },
        onFinish: () => setIsSending(false),
      }
    )
  }

  const handleAbsensiQr = async (result: IDetectedBarcode[]) => {
    const data = result[0].rawValue
    if (!data || isSending || success) return

    await handleActionWithToast(presensiSesiQrAction(idKelas, idSesi, data), {
      loading: 'Presensi sesi...',
      onStart: () => setIsSending(true),
      onSuccess: () => {
        setSuccess(true)
        router.replace(
          `${routes.pengguna.ruangKelas.diikuti.akademik}/${idKelas}/sesi-pembelajaran/${idSesi}`
        )
      },
      onFinish: () => setIsSending(false),
    })
  }

  useEffect(() => {
    setTimeout(() => {
      if (!isLoading) {
        absensiRef.current?.scrollIntoView({ behavior: 'instant' })
      }
    }, 100)
  }, [isLoading])

  if (isLoading) return <Loader height={200} />

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas.dikelola.akademik}/sesi-pembelajaran`}
          onClick={() => router.back()}
        >
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <Card ref={absensiRef} className="flex flex-col flex-1 p-0">
        <Title
          as="h6"
          weight="semibold"
          className="flex flex-wrap gap-1.5 px-4 py-4 leading-4"
        >
          <span>{data?.judul}</span>
          <small>
            (Presensi{' '}
            {tipe === 'Swafoto'
              ? 'Swafoto'
              : tipe === 'GPS'
              ? 'GPS'
              : tipe === 'QR Code'
              ? 'QR Code'
              : 'GPS dan Swafoto'}
            )
          </small>
        </Title>

        <CardSeparator />

        {success ? (
          <div className="flex justify-center items-center h-40">
            <BsCheck2 className="text-6xl text-success" />
          </div>
        ) : tipe === 'QR Code' ? (
          <div className="flex justify-center items-center">
            <div className="max-w-[520px]">
              <Scanner onScan={handleAbsensiQr} />
            </div>
          </div>
        ) : (
          <>
            {tipe !== 'Swafoto' && (
              <Map
                height={tipe !== 'GPS' ? 240 : 450}
                onChange={(pos) => setPosition(pos)}
                className="[&_.leaflet-control-attribution]:hidden"
              />
            )}

            {tipe !== 'GPS' && <Camera onChange={(image) => setPhoto(image)} />}

            <CardSeparator />

            <div className="p-2">
              <ButtonSubmit
                className="w-full"
                onClick={handleAbsensiNonQr}
                isSubmitting={isSending}
                disabled={
                  (tipe === 'Swafoto' && !photo) ||
                  (tipe === 'GPS' && !position) ||
                  (tipe !== 'Swafoto' &&
                    tipe !== 'GPS' &&
                    (!photo || !position))
                }
              >
                Presensi dan Masuk Sesi
              </ButtonSubmit>
            </div>
          </>
        )}
      </Card>
    </>
  )
}
