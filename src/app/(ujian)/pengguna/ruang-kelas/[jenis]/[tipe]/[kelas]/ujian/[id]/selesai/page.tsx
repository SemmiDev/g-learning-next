import { lihatHasilUjianAction } from '@/services/actions/pengguna/ruang-kelas/aktifitas/peserta/lihat-hasil-ujian'
import SelesaiUjianBody from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/detail-ujian/selesai/selesai-body'
import { metaObject } from '@/config/site.config'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export const metadata = {
  ...metaObject('Selesai Ujian'),
}

type SelesaiUjianPesertaPageProps = {
  params: Promise<{ kelas: string; id: string }>
}

export default async function SelesaiUjianPesertaPage({
  params,
}: SelesaiUjianPesertaPageProps) {
  const queryClient = new QueryClient()

  const { kelas: idKelas, id } = await params

  const { data, code } = await lihatHasilUjianAction(idKelas, id)

  if (code === 404) return notFound()

  await queryClient.prefetchQuery({
    queryKey: [
      'pengguna.ruang-kelas.ujian.hasil-ujian',
      'peserta',
      idKelas,
      id,
    ],
    queryFn: async () => data,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SelesaiUjianBody />
    </HydrationBoundary>
  )
}
