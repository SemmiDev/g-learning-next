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
import { lihatSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { mulaiSesiApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/mulai-sesi'
import { handleActionWithToast } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import { LatLng } from 'leaflet'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function MulaiSesiBody() {
  const { jwt } = useSessionJwt()
  const router = useRouter()

  const [position, setPosition] = useState<LatLng>()
  const [photo, setPhoto] = useState<File>()
  const [isSending, setIsSending] = useState(false)

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
    'pengajar',
    idSesi,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryDataWithParams(
      lihatSesiPembelajaranApi,
      jwt,
      idKelas,
      idSesi
    ),
  })

  const tipe = mustBe(
    data?.jenis_absensi_pengajar,
    ['GPS', 'Swafoto', 'GPS dan Swafoto'] as const,
    undefined
  )

  const handleAbsensi = async () => {
    const form = new FormData()

    if (position) {
      form.append('latitude', position.lat.toString())
      form.append('longitude', position.lng.toString())
    }

    if (photo) form.append('swafoto', photo)

    await handleActionWithToast(mulaiSesiApi(jwt, idKelas, idSesi, form), {
      loading: 'Memulai sesi...',
      onStart: () => setIsSending(true),
      onSuccess: () => {
        router.replace(
          `${routes.pengguna.ruangKelas.dikelola.akademik}/${idKelas}/sesi-pembelajaran`
        )
      },
      onFinish: () => setIsSending(false),
    })
  }

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
      <Card className="flex flex-col flex-1 p-0">
        <Title
          as="h6"
          weight="semibold"
          className="flex flex-wrap gap-1.5 px-4 py-4 leading-4"
        >
          <span>Mulai {data?.judul}</span>
          <small>
            (Presensi{' '}
            {tipe === 'Swafoto'
              ? 'Swafoto'
              : tipe === 'GPS'
              ? 'GPS'
              : 'GPS dan Swafoto'}
            )
          </small>
        </Title>

        <CardSeparator />

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
            onClick={handleAbsensi}
            isSubmitting={isSending}
            disabled={
              (tipe === 'Swafoto' && !photo) ||
              (tipe === 'GPS' && !position) ||
              (tipe !== 'Swafoto' && tipe !== 'GPS' && (!photo || !position))
            }
          >
            Presensi dan Mulai Sesi
          </ButtonSubmit>
        </div>
      </Card>
    </>
  )
}
