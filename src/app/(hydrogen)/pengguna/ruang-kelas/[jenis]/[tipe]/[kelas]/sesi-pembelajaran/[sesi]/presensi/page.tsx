import { lihatSesiPembelajaranAction } from '@/services/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import { lihatPresensiPesertaSesiAction } from '@/services/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat-presensi-peserta'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import PresensiSesiBody from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/peserta/presensi/body'
import { routes } from '@/config/routes'
import { jwtDecode } from 'jwt-decode'
import { getServerSession } from 'next-auth'
import { notFound, redirect, RedirectType } from 'next/navigation'

type PresensiSesiPageProps = {
  params: Promise<{ jenis: string; kelas: string; sesi: string }>
}

export default async function PresensiSesiPage({
  params,
}: PresensiSesiPageProps) {
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

      if (dataAbsen?.status) {
        redirect(
          `${routes.pengguna.ruangKelas.diikuti.akademik}/${idKelas}/sesi-pembelajaran/${idSesi}`,
          RedirectType.replace
        )
      }
    }
  }

  return <PresensiSesiBody />
}
