import { dataSinkronAction } from '@/actions/instansi/profil/sinkron/data'
import SinkronBody from '@/components/page/instansi/profil/sinkron/body'
import { makeSimpleQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function SinkronPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['instansi.profil.sinkron'],
    queryFn: makeSimpleQueryData(dataSinkronAction),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SinkronBody />
    </HydrationBoundary>
  )
}
