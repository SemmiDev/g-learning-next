import UndanganKelasBody from '@/components/page/others/undangan-kelas/body'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Undangan Kelas'),
}

export default async function UndanganKelasPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <UndanganKelasBody />
    </div>
  )
}
