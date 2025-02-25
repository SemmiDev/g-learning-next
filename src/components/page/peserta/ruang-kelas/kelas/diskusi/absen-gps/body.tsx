'use client'

import { Camera, Map } from '@/components/shared/absen'
import { Button, Card, CardSeparator, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { LatLng } from 'leaflet'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'

export default function DiskusiDetailAbsenGpsBody() {
  const searchParams = useSearchParams()
  const [position, setPosition] = useState<LatLng>()
  const [photo, setPhoto] = useState<File>()

  const foto = !!searchParams.get('foto')

  const handleAbsensi = () => {
    if (foto) {
      console.log('position', position)
      console.log('photo', photo)
    } else {
      console.log('position', position)
    }
  }

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.peserta.kelas}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col w-full gap-y-4 lg:w-8/12">
        <Card className="flex flex-col p-0">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Title size="1.5xl" weight="semibold" variant="dark">
                Judul materi di sini
              </Title>
              <Text size="sm">Deskripsi meterinya nanti di sini nya </Text>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-4 py-4 leading-4">
            Presensi GPS {!!foto && ' dan Swafoto'}
          </Title>

          <CardSeparator />

          <Map
            height={foto ? 240 : 450}
            onChange={(pos) => setPosition(pos)}
            className="[&_.leaflet-control-attribution]:hidden"
          />

          {foto && <Camera onChange={(image) => setPhoto(image)} />}

          <CardSeparator />

          <div className="p-2">
            <Button
              className="w-full"
              onClick={handleAbsensi}
              disabled={!(!!position && (!foto || (!!foto && !!photo)))}
            >
              Presensi dan Masuk Kelas
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}
