import KelolaSoalBody from '@/components/pages/pengguna/bank-soal/kategori/soal/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { lihatKategoriBankSoalAction } from '@/services/actions/pengguna/bank-soal/kategori/lihat'
import { lihatBankSoalAction } from '@/services/actions/pengguna/bank-soal/lihat'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export const metadata = {
  ...metaObject('Bank Soal'),
}

type BankSoalPageProps = {
  params: Promise<{ kategori: string; soal: string }>
}

export default async function BankSoalPage({ params }: BankSoalPageProps) {
  const queryClient = new QueryClient()

  const { kategori: idKategori, soal: idBankSoal } = await params

  const { data: dataKategori, code: codeKategori } =
    await lihatKategoriBankSoalAction(idKategori)

  if (codeKategori === 404) return notFound()

  await queryClient.prefetchQuery({
    queryKey: ['pengguna.bank-soal.kategori.lihat', idKategori],
    queryFn: async () => dataKategori,
  })

  const { data: dataBankSoal, code: codeBankSoal } = await lihatBankSoalAction(
    idKategori,
    idBankSoal
  )

  if (codeBankSoal === 404) return notFound()

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
