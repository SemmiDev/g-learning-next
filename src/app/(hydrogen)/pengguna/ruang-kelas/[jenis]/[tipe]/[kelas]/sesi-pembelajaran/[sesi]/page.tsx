import { lihatSesiPembelajaranAction } from '@/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { lihatPresensiPesertaSesiAction } from '@/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat-presensi-peserta'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import LihatSesiBody from '@/components/page/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/body'
import { routes } from '@/config/routes'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { getServerSession } from 'next-auth'
import { notFound, redirect, RedirectType } from 'next/navigation'

type LihatSesiPageProps = {
  params: Promise<{ jenis: string; kelas: string; sesi: string }>
}

export default async function LihatSesiPage({ params }: LihatSesiPageProps) {
  const queryClient = new QueryClient()

  const { jenis: jenisKelas, kelas: idKelas, sesi: idSesi } = await params

  if (jenisKelas === 'diikuti') {
    const { data } = await lihatSesiPembelajaranAction(idKelas, idSesi)

    if (data?.status === 'Belum Dibuka') {
      notFound()
    } else if (data?.status === 'Sedang Berlangsung') {
      const session = await getServerSession(authOptions)
      const decodedToken = session?.jwt ? jwtDecode<any>(session?.jwt) : {}
      const idPengguna = decodedToken.id_pengguna as string

      const { data: dataAbsen } = await lihatPresensiPesertaSesiAction(
        idKelas,
        idSesi,
        idPengguna
      )

      if (
        !dataAbsen?.status &&
        ['GPS', 'Swafoto', 'GPS dan Swafoto'].includes(
          data?.jenis_absensi_peserta || ''
        )
      ) {
        redirect(
          `${routes.pengguna.ruangKelas.diikuti.akademik}/${idKelas}/sesi-pembelajaran/${idSesi}/presensi`,
          RedirectType.replace
        )
      }
    }

    await queryClient.prefetchQuery({
      queryKey: [
        'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
        'pengajar',
        idKelas,
        idSesi,
      ],
      queryFn: async () => data,
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LihatSesiBody />
    </HydrationBoundary>
  )
}
