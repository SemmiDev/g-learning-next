import { tableRiwayatPembayaranAction } from '@/actions/instansi/profil/riwayat-pembayaran/table'
import ProfilRiwayatPembayaranBody from '@/components/page/instansi/profil/riwayat-pembayaran/body'
import { makeAsyncTableQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function RiwayatPembayaranPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['instansi.profil.riwayat-pembayaran.table'],
    queryFn: makeAsyncTableQueryData(tableRiwayatPembayaranAction),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilRiwayatPembayaranBody />
    </HydrationBoundary>
  )
}
