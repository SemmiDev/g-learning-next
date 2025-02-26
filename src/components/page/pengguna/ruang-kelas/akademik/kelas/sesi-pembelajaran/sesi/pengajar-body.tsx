import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import PengajarBahanAjarCard from './pengajar/bahan-ajar-card'
import PengajarPresensiCard from './pengajar/presensi-card'
import PengajarSesiCard from './pengajar/sesi-card'

export default function PengajarLihatSesiBody() {
  const router = useRouter()

  const { kelas: idKelas }: { kelas: string } = useParams()

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas.dikelola.akademik}/${idKelas}/sesi-pembelajaran`}
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
          <PengajarSesiCard />
          <PengajarBahanAjarCard />
        </div>
        <PengajarPresensiCard className="flex-1" />
      </div>
    </>
  )
}
