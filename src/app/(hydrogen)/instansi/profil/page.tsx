import UbahButton from '@/components/page/instansi/profil/detail/ubah-button'
import UbahLogoButton from '@/components/page/instansi/profil/detail/ubah-logo-button'
import {
  Card,
  CardSeparator,
  TextBordered,
  Thumbnail,
  Title,
} from '@/components/ui'
import logo from '@public/images/instansi-logo.png'
import { ReactNode } from 'react'

export default function DetailPage() {
  return (
    <Card className="flex flex-col p-0">
      <div className="flex justify-between p-2">
        <Title as="h4" size="1.5xl" weight="semibold">
          Detail Instansi
        </Title>
        <UbahButton />
      </div>
      <CardSeparator />
      <table className="text-sm text-gray-dark m-2">
        <tbody>
          <DataRow label="Nama Instansi" outline>
            UIN SUSKA Riau
          </DataRow>
          <DataRow label="Nama Pimpinan" outline>
            Prof. Dr. H. Khairunnas Raja, M.Ag
          </DataRow>
          <DataRow label="Kontak Pimpinan" outline>
            0812 3456 7890
          </DataRow>
          <DataRow label="Alamat Instansi" outline>
            Panam, Jl. HR. Soebrantas No.Km. 15, RW.15, Simpang Baru, Kota
            Pekanbaru, Riau 28293
          </DataRow>
          <DataRow label="Kontak Admin" outline>
            0809 8765 4321
          </DataRow>
          <DataRow label="Bio" outline>
            Universitas Islam Negeri Sultan Syarif Kasim Riau (UIN Suska Riau)
            adalah perguruan tinggi negeri berbasis Islam yang berlokasi di
            Pekanbaru, Riau. UIN Suska Riau mengintegrasikan ilmu pengetahuan
            umum dengan nilai-nilai Islam, memberikan kontribusi dalam
            pendidikan, penelitian, dan pengabdian masyarakat. Universitas ini
            menawarkan program studi dari tingkat sarjana hingga pascasarjana di
            berbagai disiplin ilmu, termasuk ilmu sosial, sains, teknologi, dan
            agama Islam. UIN Suska Riau berkomitmen mencetak lulusan yang
            kompeten, berakhlak mulia, dan siap berkontribusi dalam pembangunan
            masyarakat.
          </DataRow>
          <DataRow label="Logo Instansi">
            <div className="inline-block relative">
              <UbahLogoButton />
              <Thumbnail
                src={logo}
                size={150}
                rounded="md"
                alt="logo"
                bordered
              />
            </div>
          </DataRow>
        </tbody>
      </table>
    </Card>
  )
}

function DataRow({
  label,
  children,
  outline,
}: {
  label: string
  children?: ReactNode
  outline?: boolean
}) {
  return (
    <tr className="[&>td]:py-2">
      <td className="w-40 font-semibold align-baseline">{label}</td>
      <td className="">
        {outline ? <TextBordered>{children}</TextBordered> : children}
      </td>
    </tr>
  )
}
