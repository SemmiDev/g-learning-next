'use client'

import { Button, Card, CardSeparator, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { LatLng } from 'leaflet'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import Camera from './camera'
import Map from './map'

export default function AbsensiSesiBody() {
  const searchParams = useSearchParams()
  const [position, setPosition] = useState<LatLng>()
  const [photo, setPhoto] = useState<File>()

  const tipe = searchParams.get('tipe')

  const handleAbsensi = () => {
    if (tipe === 'foto') {
      console.log('photo', photo)
    } else if (tipe === 'gps') {
      console.log('position', position)
    } else {
      console.log('photo', photo)
      console.log('position', position)
    }
  }

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.penggunaAkademik.ruangKelasDikelola}/akademik/kelas/sesi-pembelajaran`}
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
        <Title as="h6" weight="semibold" className="px-4 py-4 leading-4">
          Presensi{' '}
          {tipe === 'foto'
            ? 'Swafoto'
            : tipe === 'gps'
            ? 'GPS'
            : 'GPS dan Swafoto'}
        </Title>

        <CardSeparator />

        {tipe !== 'foto' && (
          <Map
            height={tipe !== 'gps' ? 240 : 450}
            onChange={(pos) => setPosition(pos)}
            className="[&_.leaflet-control-attribution]:hidden"
          />
        )}

        {tipe !== 'gps' && <Camera onChange={(image) => setPhoto(image)} />}

        <CardSeparator />

        <div className="p-2">
          <Button
            className="w-full"
            onClick={handleAbsensi}
            disabled={
              (tipe === 'foto' && !photo) ||
              (tipe === 'gps' && !position) ||
              (tipe !== 'foto' && tipe !== 'gps' && (!photo || !position))
            }
          >
            Presensi dan Masuk Kelas
          </Button>
        </div>
      </Card>
    </>
  )
}
