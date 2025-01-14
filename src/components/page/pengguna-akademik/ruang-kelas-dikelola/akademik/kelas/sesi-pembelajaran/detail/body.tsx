'use client'

import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import Presensi from './presensi-card'
import SesiCard from './sesi-card'
import BahanAjarCard from './bahan-ajar-card'

export default function SesiPembelajaranDetailBody() {
  const router = useRouter()

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.penggunaAkademik.ruangKelasDikelola}/akademik/kelas/sesi-pembelajaran`}
          onClick={() => router.back()}
        >
          <Button
            as="span"
            variant="text"
            color="primary"
            className="text-gray-dark"
          >
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start gap-y-8 gap-x-4">
        <div className="flex flex-col gap-y-4 w-full lg:w-7/12">
          <SesiCard />
          <BahanAjarCard />
        </div>
        <Presensi className="flex-1" />
      </div>
    </>
  )
}
