import { lihatKategoriBankSoalAction } from '@/actions/pengguna/bank-soal/kategori/lihat'
import { lihatBankSoalAction } from '@/actions/pengguna/bank-soal/lihat'
import KelolaSoalBody from '@/components/page/pengguna/bank-soal/kategori/soal/container'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Bank Soal'),
}

type BankSoalPageProps = {
  params: { kategori: string; soal: string }
}

export default async function BankSoalPage({ params }: BankSoalPageProps) {
  const idKategori = params.kategori
  const idBankSoal = params.soal
  const queryClient = new QueryClient()

  const { data: dataKategori } = await lihatKategoriBankSoalAction(idKategori)
  const { data: dataBankSoal } = await lihatBankSoalAction(
    idKategori,
    idBankSoal
  )

  await queryClient.prefetchQuery({
    queryKey: ['pengguna.bank-soal.kategori.lihat', idKategori],
    queryFn: async () => dataKategori,
  })
  await queryClient.prefetchQuery({
    queryKey: ['pengguna.bank-soal.lihat', idKategori, idBankSoal],
    queryFn: async () => dataBankSoal,
  })

  const pageHeader = {
    title: 'Bank Soal',
    breadcrumb: [
      {
        href: routes.dashboard,
        name: 'Dasbor',
      },
      {
        href: routes.pengguna.bankSoal,
        name: 'Bank Soal',
      },
      {
        href: `${routes.pengguna.bankSoal}/${idKategori}`,
        name: dataKategori?.nama_kategori ?? '',
      },
      {
        name: dataBankSoal?.judul ?? '',
      },
    ],
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <KelolaSoalBody />
      </HydrationBoundary>
    </>
  )
}
