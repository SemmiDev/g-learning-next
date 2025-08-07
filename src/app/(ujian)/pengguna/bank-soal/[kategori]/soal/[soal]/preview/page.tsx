import PreviewSoalUjianBody from '@/components/pages/pengguna/bank-soal/kategori/soal/preview/body'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Preview Soal'),
}

type PreviewSoalPageProps = {
  // params: Promise<{ kategori: string; soal: string }>
}

export default function PreviewSoalPage({}: PreviewSoalPageProps) {
  return <PreviewSoalUjianBody />
}
