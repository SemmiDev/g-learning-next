import { lihatKelasAction } from '@/services/actions/pengguna/ruang-kelas/lihat'
import { lihatSesiPembelajaranAction } from '@/services/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import QRCodeBody from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/qrcode/body'
import { notFound } from 'next/navigation'

type QRCodePageProps = {
  params: Promise<{ kelas: string; sesi: string }>
}

export default async function QRCodePage({ params }: QRCodePageProps) {
  const { kelas: idKelas, sesi: idSesi } = await params

  const [{ data: dataKelas }, { data: dataSesi }] = await Promise.all([
    lihatKelasAction(idKelas),
    lihatSesiPembelajaranAction(idKelas, idSesi),
  ])

  if (
    dataKelas?.peran !== 'Pengajar' ||
    dataSesi?.jenis_absensi_peserta !== 'QR Code'
  ) {
    notFound()
  }

  return <QRCodeBody sesi={dataSesi} />
}
